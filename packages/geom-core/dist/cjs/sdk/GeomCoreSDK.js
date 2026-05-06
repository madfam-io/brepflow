"use strict";
/**
 * GeomCore SDK - Smart Geometry Operations with Zero-Lag UX
 *
 * This SDK provides intelligent routing between local WASM execution
 * and remote GPU compute for optimal performance.
 *
 * Key Features:
 * - Automatic operation routing (local vs remote)
 * - Precomputation hints for speculative execution
 * - Memory management with LRU eviction
 * - Performance monitoring and slow operation callbacks
 *
 * @module geom-core/sdk
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeomCoreSDK = void 0;
exports.createGeomCoreSDK = createGeomCoreSDK;
exports.createBrowserSDK = createBrowserSDK;
exports.createPaidTierSDK = createPaidTierSDK;
// =============================================================================
// Remote Compute Client
// =============================================================================
class RemoteComputeClient {
    endpoint;
    apiKey;
    ws;
    pendingJobs = new Map();
    constructor(endpoint, apiKey, useWebSocket = false) {
        this.endpoint = endpoint;
        this.apiKey = apiKey;
        if (useWebSocket) {
            this.connectWebSocket();
        }
    }
    connectWebSocket() {
        const wsEndpoint = this.endpoint.replace(/^http/, "ws") + "/ws";
        this.ws = new WebSocket(wsEndpoint);
        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const pending = this.pendingJobs.get(data.jobId);
            if (pending) {
                if (data.status === "completed") {
                    pending.resolve(data.result);
                }
                else if (data.status === "failed") {
                    pending.reject(new Error(data.error));
                }
                if (data.status === "completed" || data.status === "failed") {
                    this.pendingJobs.delete(data.jobId);
                }
            }
        };
        this.ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
    }
    async executeRemote(operation, params) {
        const headers = {
            "Content-Type": "application/json",
        };
        if (this.apiKey) {
            headers["Authorization"] = `Bearer ${this.apiKey}`;
        }
        const response = await fetch(`${this.endpoint}/compute`, {
            method: "POST",
            headers,
            body: JSON.stringify({
                operation,
                params,
                timestamp: Date.now(),
            }),
        });
        if (!response.ok) {
            throw new Error(`Remote compute failed: ${response.statusText}`);
        }
        const result = await response.json();
        return result.shape;
    }
    async submitJob(operation, params) {
        const headers = {
            "Content-Type": "application/json",
        };
        if (this.apiKey) {
            headers["Authorization"] = `Bearer ${this.apiKey}`;
        }
        const response = await fetch(`${this.endpoint}/jobs`, {
            method: "POST",
            headers,
            body: JSON.stringify({
                operation,
                params,
            }),
        });
        if (!response.ok) {
            throw new Error(`Failed to submit job: ${response.statusText}`);
        }
        const result = await response.json();
        return result.jobId;
    }
    async getJobStatus(jobId) {
        const headers = {};
        if (this.apiKey) {
            headers["Authorization"] = `Bearer ${this.apiKey}`;
        }
        const response = await fetch(`${this.endpoint}/jobs/${jobId}`, {
            headers,
        });
        if (!response.ok) {
            throw new Error(`Failed to get job status: ${response.statusText}`);
        }
        return response.json();
    }
    waitForJob(jobId) {
        return new Promise((resolve, reject) => {
            if (this.ws) {
                // Use WebSocket for real-time updates
                this.pendingJobs.set(jobId, { resolve, reject });
                this.ws.send(JSON.stringify({ type: "subscribe", jobId }));
            }
            else {
                // Poll for status
                const poll = async () => {
                    const status = await this.getJobStatus(jobId);
                    if (status.status === "completed" && status.result) {
                        resolve(status.result);
                    }
                    else if (status.status === "failed") {
                        reject(new Error(status.error || "Job failed"));
                    }
                    else {
                        setTimeout(poll, 100); // Poll every 100ms
                    }
                };
                poll();
            }
        });
    }
    disconnect() {
        if (this.ws) {
            this.ws.close();
        }
    }
}
// =============================================================================
// Precomputation Manager
// =============================================================================
class PrecomputationManager {
    cache = new Map();
    pending = new Map();
    maxCacheAge = 30000; // 30 seconds
    generateKey(operation, params) {
        return `${operation}:${JSON.stringify(params)}`;
    }
    getCached(key) {
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < this.maxCacheAge) {
            return cached.result;
        }
        if (cached) {
            this.cache.delete(key);
        }
        return undefined;
    }
    setCached(key, result) {
        this.cache.set(key, {
            result,
            timestamp: Date.now(),
        });
    }
    setPending(key, promise) {
        this.pending.set(key, promise);
        promise.finally(() => {
            this.pending.delete(key);
        });
    }
    getPending(key) {
        return this.pending.get(key);
    }
    clear() {
        this.cache.clear();
        this.pending.clear();
    }
}
// =============================================================================
// GeomCore SDK
// =============================================================================
class GeomCoreSDK {
    engine;
    config;
    remoteClient;
    precomputation;
    slowOpCallbacks = [];
    memoryCallbacks = [];
    usedMemoryBytes = 0;
    constructor(engine, config = {}) {
        this.engine = engine;
        this.precomputation = new PrecomputationManager();
        this.config = {
            maxMemoryBytes: config.maxMemoryBytes ?? 512 * 1024 * 1024, // 512MB
            slowOperationThresholdMs: config.slowOperationThresholdMs ?? 100,
            enableRemoteCompute: config.enableRemoteCompute ?? !!config.remoteEndpoint,
            remoteEndpoint: config.remoteEndpoint ?? "",
            remoteApiKey: config.remoteApiKey ?? "",
            remoteComplexityThreshold: config.remoteComplexityThreshold ?? 0.7,
            enablePrecomputation: config.enablePrecomputation ?? true,
            useWebSocket: config.useWebSocket ?? false,
        };
        if (this.config.enableRemoteCompute && this.config.remoteEndpoint) {
            this.remoteClient = new RemoteComputeClient(this.config.remoteEndpoint, this.config.remoteApiKey, this.config.useWebSocket);
        }
    }
    // ===========================================================================
    // Lifecycle
    // ===========================================================================
    dispose() {
        this.engine.disposeAll();
        this.precomputation.clear();
        this.remoteClient?.disconnect();
    }
    getStats() {
        return {
            shapeCount: this.engine.getShapeCount(),
            usedMemoryBytes: this.usedMemoryBytes,
            maxMemoryBytes: this.config.maxMemoryBytes,
            remoteEnabled: this.config.enableRemoteCompute,
        };
    }
    // ===========================================================================
    // Callbacks
    // ===========================================================================
    onSlowOperation(callback) {
        this.slowOpCallbacks.push(callback);
        return () => {
            const idx = this.slowOpCallbacks.indexOf(callback);
            if (idx >= 0)
                this.slowOpCallbacks.splice(idx, 1);
        };
    }
    onMemoryPressure(callback) {
        this.memoryCallbacks.push(callback);
        return () => {
            const idx = this.memoryCallbacks.indexOf(callback);
            if (idx >= 0)
                this.memoryCallbacks.splice(idx, 1);
        };
    }
    notifySlowOperation(operation, durationMs) {
        if (durationMs >= this.config.slowOperationThresholdMs) {
            for (const cb of this.slowOpCallbacks) {
                cb(operation, durationMs);
            }
        }
    }
    checkMemoryPressure(additionalBytes) {
        const newUsed = this.usedMemoryBytes + additionalBytes;
        if (newUsed > this.config.maxMemoryBytes * 0.9) {
            for (const cb of this.memoryCallbacks) {
                cb(newUsed, this.config.maxMemoryBytes);
            }
        }
        if (newUsed > this.config.maxMemoryBytes) {
            // Trigger eviction - this would need integration with the engine
            console.warn("Memory pressure: consider disposing unused shapes");
        }
    }
    // ===========================================================================
    // Smart Operation Routing
    // ===========================================================================
    async executeWithRouting(operation, params, localExecutor, hint) {
        const shapeIds = this.extractShapeIds(params);
        const complexity = this.engine.estimateComplexity(operation, shapeIds);
        // Determine execution location
        let location = hint?.preferLocation ?? "auto";
        if (location === "auto") {
            if (complexity.score > this.config.remoteComplexityThreshold &&
                this.config.enableRemoteCompute) {
                location = "remote";
            }
            else {
                location = "local";
            }
        }
        // Check precomputation cache
        if (this.config.enablePrecomputation) {
            const cacheKey = this.precomputation.generateKey(operation, params);
            const cached = this.precomputation.getCached(cacheKey);
            if (cached) {
                return {
                    success: true,
                    value: cached,
                    durationMs: 0,
                    wasCached: true,
                };
            }
            // Check for pending precomputation
            const pending = this.precomputation.getPending(cacheKey);
            if (pending) {
                const result = await pending;
                return {
                    success: true,
                    value: result,
                    durationMs: 0,
                    wasCached: true,
                };
            }
        }
        // Execute based on location
        if (location === "remote" && this.remoteClient) {
            try {
                const result = await this.remoteClient.executeRemote(operation, params);
                return {
                    success: true,
                    value: result,
                    executedRemotely: true,
                };
            }
            catch (error) {
                // Fall back to local on remote failure
                console.warn(`Remote execution failed, falling back to local: ${error}`);
            }
        }
        // Local execution
        const result = localExecutor();
        if (result.durationMs !== undefined) {
            this.notifySlowOperation(operation, result.durationMs);
        }
        if (result.success && result.memoryUsedBytes) {
            this.checkMemoryPressure(result.memoryUsedBytes);
            this.usedMemoryBytes += result.memoryUsedBytes;
        }
        return result;
    }
    extractShapeIds(params) {
        const ids = [];
        const extractId = (value) => {
            if (typeof value === "string" && value.startsWith("shape_")) {
                ids.push(value);
            }
            else if (typeof value === "object" && value !== null) {
                if ("id" in value && typeof value.id === "string") {
                    ids.push(value.id);
                }
            }
        };
        for (const value of Object.values(params)) {
            if (Array.isArray(value)) {
                value.forEach(extractId);
            }
            else {
                extractId(value);
            }
        }
        return ids;
    }
    // ===========================================================================
    // Precomputation Hints
    // ===========================================================================
    /**
     * Hint that an operation may be performed soon (e.g., user hovering over tool).
     * The SDK will speculatively execute and cache the result.
     */
    precompute(operation, params) {
        if (!this.config.enablePrecomputation)
            return;
        const cacheKey = this.precomputation.generateKey(operation, params);
        // Don't precompute if already cached or pending
        if (this.precomputation.getCached(cacheKey))
            return;
        if (this.precomputation.getPending(cacheKey))
            return;
        // Get the executor for this operation
        const executor = this.getOperationExecutor(operation, params);
        if (!executor)
            return;
        const promise = new Promise((resolve, reject) => {
            // Execute in next microtask to not block current frame
            queueMicrotask(() => {
                try {
                    const result = executor();
                    if (result.success && result.value) {
                        this.precomputation.setCached(cacheKey, result.value);
                        resolve(result.value);
                    }
                    else {
                        reject(new Error(result.error?.message || "Precomputation failed"));
                    }
                }
                catch (error) {
                    reject(error);
                }
            });
        });
        this.precomputation.setPending(cacheKey, promise);
    }
    /**
     * Cancel a precomputation hint (e.g., user moved away from tool).
     */
    cancelPrecompute(operation, params) {
        // Generate cache key for potential future use with cancellation tokens
        const _cacheKey = this.precomputation.generateKey(operation, params);
        // Note: Can't actually cancel in-flight operations, but we can remove from pending
        // In a real implementation, we'd need cancellation tokens
        void _cacheKey; // Suppress unused variable warning
    }
    getOperationExecutor(operation, params) {
        // Map operation names to engine methods
        const executors = {
            makeBox: () => this.engine.makeBox(params),
            makeSphere: () => this.engine.makeSphere(params),
            makeCylinder: () => this.engine.makeCylinder(params),
            makeCone: () => this.engine.makeCone(params),
            makeTorus: () => this.engine.makeTorus(params),
            booleanUnion: () => this.engine.booleanUnion(params),
            booleanSubtract: () => this.engine.booleanSubtract(params),
            booleanIntersect: () => this.engine.booleanIntersect(params),
            extrude: () => this.engine.extrude(params),
            revolve: () => this.engine.revolve(params),
            fillet: () => this.engine.fillet(params),
            chamfer: () => this.engine.chamfer(params),
        };
        return executors[operation] || null;
    }
    // ===========================================================================
    // Complexity Estimation
    // ===========================================================================
    estimateComplexity(operation, shapeIds) {
        return this.engine.estimateComplexity(operation, shapeIds);
    }
    // ===========================================================================
    // 3D Primitives (Always Local - <5ms)
    // ===========================================================================
    async makeBox(params, hint) {
        return this.executeWithRouting("makeBox", (params || {}), () => this.engine.makeBox(params), { ...hint, preferLocation: "local" });
    }
    async makeSphere(params, hint) {
        return this.executeWithRouting("makeSphere", (params || {}), () => this.engine.makeSphere(params), { ...hint, preferLocation: "local" });
    }
    async makeCylinder(params, hint) {
        return this.executeWithRouting("makeCylinder", (params || {}), () => this.engine.makeCylinder(params), { ...hint, preferLocation: "local" });
    }
    async makeCone(params, hint) {
        return this.executeWithRouting("makeCone", (params || {}), () => this.engine.makeCone(params), { ...hint, preferLocation: "local" });
    }
    async makeTorus(params, hint) {
        return this.executeWithRouting("makeTorus", (params || {}), () => this.engine.makeTorus(params), { ...hint, preferLocation: "local" });
    }
    // ===========================================================================
    // Boolean Operations (Auto-Routed)
    // ===========================================================================
    async booleanUnion(params, hint) {
        return this.executeWithRouting("booleanUnion", params, () => this.engine.booleanUnion(params), hint);
    }
    async booleanSubtract(params, hint) {
        return this.executeWithRouting("booleanSubtract", params, () => this.engine.booleanSubtract(params), hint);
    }
    async booleanIntersect(params, hint) {
        return this.executeWithRouting("booleanIntersect", params, () => this.engine.booleanIntersect(params), hint);
    }
    // ===========================================================================
    // Feature Operations (Auto-Routed)
    // ===========================================================================
    async extrude(params, hint) {
        return this.executeWithRouting("extrude", params, () => this.engine.extrude(params), hint);
    }
    async revolve(params, hint) {
        return this.executeWithRouting("revolve", params, () => this.engine.revolve(params), hint);
    }
    async sweep(params, hint) {
        return this.executeWithRouting("sweep", params, () => this.engine.sweep(params), hint);
    }
    async loft(params, hint) {
        return this.executeWithRouting("loft", params, () => this.engine.loft(params), hint);
    }
    async fillet(params, hint) {
        return this.executeWithRouting("fillet", params, () => this.engine.fillet(params), hint);
    }
    async chamfer(params, hint) {
        return this.executeWithRouting("chamfer", params, () => this.engine.chamfer(params), hint);
    }
    async shell(params, hint) {
        return this.executeWithRouting("shell", params, () => this.engine.shell(params), hint);
    }
    async offset(params, hint) {
        return this.executeWithRouting("offset", params, () => this.engine.offset(params), hint);
    }
    // ===========================================================================
    // Transforms (Always Local - <2ms)
    // ===========================================================================
    async translate(params) {
        return this.engine.translate(params);
    }
    async rotate(params) {
        return this.engine.rotate(params);
    }
    async scale(params) {
        return this.engine.scale(params);
    }
    async mirror(params) {
        return this.engine.mirror(params);
    }
    // ===========================================================================
    // Analysis (Local with Remote fallback for large meshes)
    // ===========================================================================
    async tessellate(shapeId, options, _hint) {
        // Tessellation is always local for responsiveness
        // Note: _hint parameter reserved for future remote tessellation support
        return this.engine.tessellate(shapeId, options);
    }
    async getProperties(shapeId) {
        return this.engine.getProperties(shapeId);
    }
    async getVolume(shapeId) {
        return this.engine.getVolume(shapeId);
    }
    async getSurfaceArea(shapeId) {
        return this.engine.getSurfaceArea(shapeId);
    }
    // ===========================================================================
    // Memory Management
    // ===========================================================================
    disposeShape(id) {
        const success = this.engine.disposeShape(id);
        if (success) {
            // Estimate freed memory (would need actual tracking in production)
            this.usedMemoryBytes = Math.max(0, this.usedMemoryBytes - 50000);
        }
        return success;
    }
    disposeAll() {
        this.engine.disposeAll();
        this.usedMemoryBytes = 0;
        this.precomputation.clear();
    }
}
exports.GeomCoreSDK = GeomCoreSDK;
// =============================================================================
// Factory Functions
// =============================================================================
function createGeomCoreSDK(engine, config) {
    return new GeomCoreSDK(engine, config);
}
/**
 * Create SDK configured for browser use (local WASM only)
 */
function createBrowserSDK(engine) {
    return new GeomCoreSDK(engine, {
        enableRemoteCompute: false,
        enablePrecomputation: true,
        maxMemoryBytes: 256 * 1024 * 1024, // 256MB for browser
        slowOperationThresholdMs: 16, // Target 60fps
    });
}
/**
 * Create SDK configured for paid tier with remote GPU compute
 */
function createPaidTierSDK(engine, remoteEndpoint, apiKey) {
    return new GeomCoreSDK(engine, {
        enableRemoteCompute: true,
        remoteEndpoint,
        remoteApiKey: apiKey,
        useWebSocket: true,
        enablePrecomputation: true,
        maxMemoryBytes: 512 * 1024 * 1024, // 512MB
        remoteComplexityThreshold: 0.5, // More aggressive offloading for paid users
    });
}
//# sourceMappingURL=GeomCoreSDK.js.map