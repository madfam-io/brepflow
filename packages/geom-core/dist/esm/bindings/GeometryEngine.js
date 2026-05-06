/**
 * GeometryEngine - Unified OCCT Geometry Engine
 *
 * Consolidated from sim4d/engine-occt bindings for cross-project use.
 * Provides a single entry point for all geometry operations.
 *
 * @module geom-core
 */
import { createHandleId, getShapeId } from "./types";
function createLogger(module) {
    const log = (level, msg, ...args) => {
        if (process.env.NODE_ENV !== "production" || level === "error") {
            console[level](`[${module}]`, msg, ...args);
        }
    };
    return {
        debug: (msg, ...args) => log("debug", msg, ...args),
        info: (msg, ...args) => log("info", msg, ...args),
        warn: (msg, ...args) => log("warn", msg, ...args),
        error: (msg, ...args) => log("error", msg, ...args),
    };
}
// =============================================================================
// ID Generator
// =============================================================================
class IDGenerator {
    nextId;
    constructor(startId = 1) {
        this.nextId = startId;
    }
    generate() {
        return `shape_${this.nextId++}`;
    }
    getCurrent() {
        return this.nextId;
    }
    setCurrent(id) {
        this.nextId = id;
    }
}
// =============================================================================
// Vec3 Utilities
// =============================================================================
class Vec3Utils {
    occt;
    constructor(occt) {
        this.occt = occt;
    }
    createVec3(v) {
        const vec = new this.occt.gp_Vec();
        vec.SetCoord(v.x, v.y, v.z);
        return vec;
    }
    createPoint(v) {
        return new this.occt.gp_Pnt(v.x, v.y, v.z);
    }
    createDir(v) {
        return new this.occt.gp_Dir(v.x, v.y, v.z);
    }
    createAxis(center, direction) {
        const pnt = this.createPoint(center);
        const dir = this.createDir(direction);
        return new this.occt.gp_Ax2(pnt, dir);
    }
}
// =============================================================================
// Shape Handle Utilities
// =============================================================================
class ShapeUtils {
    occt;
    shapes;
    idGen;
    constructor(occt, shapes, idGen) {
        this.occt = occt;
        this.shapes = shapes;
        this.idGen = idGen;
    }
    calculateBounds(shape) {
        const bnd = new this.occt.Bnd_Box();
        const builder = new this.occt.BRepBndLib();
        builder.Add(shape, bnd);
        const min = bnd.CornerMin();
        const max = bnd.CornerMax();
        const bbox = {
            min: { x: min.X(), y: min.Y(), z: min.Z() },
            max: { x: max.X(), y: max.Y(), z: max.Z() },
        };
        min.delete();
        max.delete();
        bnd.delete();
        builder.delete();
        return bbox;
    }
    createHandle(shape, type = "solid") {
        const id = this.idGen.generate();
        const bbox = this.calculateBounds(shape);
        this.shapes.set(id, shape);
        return {
            id: createHandleId(id),
            type,
            bbox,
            hash: id.substring(0, 16),
        };
    }
    getShape(shapeOrId) {
        const id = getShapeId(shapeOrId);
        return this.shapes.get(id);
    }
}
// =============================================================================
// Operation Timing Decorator
// =============================================================================
function timed(operation, fn, logger) {
    const start = performance.now();
    try {
        const value = fn();
        const durationMs = performance.now() - start;
        if (durationMs > 100) {
            logger.warn(`Slow operation: ${operation} took ${durationMs.toFixed(2)}ms`);
        }
        return {
            success: true,
            value,
            durationMs,
        };
    }
    catch (error) {
        const durationMs = performance.now() - start;
        const message = error instanceof Error ? error.message : String(error);
        logger.error(`Operation failed: ${operation}`, error);
        return {
            success: false,
            error: {
                code: "OPERATION_FAILED",
                message,
            },
            durationMs,
        };
    }
}
// =============================================================================
// GeometryEngine Class
// =============================================================================
export class GeometryEngine {
    occt;
    shapes;
    idGen;
    vec3;
    shapeUtils;
    logger;
    initialized = false;
    constructor(occt) {
        this.occt = occt;
        this.shapes = new Map();
        this.idGen = new IDGenerator();
        this.vec3 = new Vec3Utils(occt);
        this.shapeUtils = new ShapeUtils(occt, this.shapes, this.idGen);
        this.logger = createLogger("GeometryEngine");
        this.initialized = true;
    }
    // ===========================================================================
    // Lifecycle
    // ===========================================================================
    isInitialized() {
        return this.initialized;
    }
    getShapeCount() {
        return this.shapes.size;
    }
    getShape(id) {
        return this.shapes.get(id);
    }
    disposeShape(id) {
        const shape = this.shapes.get(id);
        if (shape) {
            shape.delete();
            this.shapes.delete(id);
            return true;
        }
        return false;
    }
    disposeAll() {
        for (const shape of this.shapes.values()) {
            shape.delete();
        }
        this.shapes.clear();
        this.idGen.setCurrent(1);
    }
    // ===========================================================================
    // 3D Primitives
    // ===========================================================================
    makeBox(params = {}) {
        return timed("makeBox", () => {
            const { width = 100, height = 100, depth = 100 } = params;
            const builder = new this.occt.BRepPrimAPI_MakeBox(width, height, depth);
            const shape = builder.Shape();
            const handle = this.shapeUtils.createHandle(shape, "solid");
            builder.delete();
            return handle;
        }, this.logger);
    }
    makeSphere(params = {}) {
        return timed("makeSphere", () => {
            const { radius = 50, center = { x: 0, y: 0, z: 0 } } = params;
            const centerPnt = this.vec3.createPoint(center);
            const builder = new this.occt.BRepPrimAPI_MakeSphere(centerPnt, radius);
            const shape = builder.Shape();
            const handle = this.shapeUtils.createHandle(shape, "solid");
            centerPnt.delete();
            builder.delete();
            return handle;
        }, this.logger);
    }
    makeCylinder(params = {}) {
        return timed("makeCylinder", () => {
            const { radius = 50, height = 100, center = { x: 0, y: 0, z: 0 }, axis = { x: 0, y: 0, z: 1 }, } = params;
            const ax = this.vec3.createAxis(center, axis);
            const builder = new this.occt.BRepPrimAPI_MakeCylinder(ax, radius, height);
            const shape = builder.Shape();
            const handle = this.shapeUtils.createHandle(shape, "solid");
            ax.delete();
            builder.delete();
            return handle;
        }, this.logger);
    }
    makeCone(params = {}) {
        return timed("makeCone", () => {
            const { radius1 = 50, radius2 = 25, height = 100, center = { x: 0, y: 0, z: 0 }, axis = { x: 0, y: 0, z: 1 }, } = params;
            const ax = this.vec3.createAxis(center, axis);
            const builder = new this.occt.BRepPrimAPI_MakeCone(ax, radius1, radius2, height);
            const shape = builder.Shape();
            const handle = this.shapeUtils.createHandle(shape, "solid");
            ax.delete();
            builder.delete();
            return handle;
        }, this.logger);
    }
    makeTorus(params = {}) {
        return timed("makeTorus", () => {
            const { majorRadius = 50, minorRadius = 20, center = { x: 0, y: 0, z: 0 }, axis = { x: 0, y: 0, z: 1 }, } = params;
            const ax = this.vec3.createAxis(center, axis);
            const builder = new this.occt.BRepPrimAPI_MakeTorus(ax, majorRadius, minorRadius);
            const shape = builder.Shape();
            const handle = this.shapeUtils.createHandle(shape, "solid");
            ax.delete();
            builder.delete();
            return handle;
        }, this.logger);
    }
    // ===========================================================================
    // 2D Primitives
    // ===========================================================================
    createLine(params) {
        return timed("createLine", () => {
            const start = this.vec3.createPoint(params.start);
            const end = this.vec3.createPoint(params.end);
            const edge = new this.occt.BRepBuilderAPI_MakeEdge(start, end);
            const shape = edge.Shape();
            const handle = this.shapeUtils.createHandle(shape, "curve");
            start.delete();
            end.delete();
            edge.delete();
            return handle;
        }, this.logger);
    }
    createCircle(params = {}) {
        return timed("createCircle", () => {
            const { center = { x: 0, y: 0, z: 0 }, radius = 50, normal = { x: 0, y: 0, z: 1 }, } = params;
            const centerPnt = this.vec3.createPoint(center);
            const normalDir = this.vec3.createDir(normal);
            const axis = new this.occt.gp_Ax2(centerPnt, normalDir);
            const circle = new this.occt.gp_Circ(axis, radius);
            const edge = new this.occt.BRepBuilderAPI_MakeEdge(circle, circle);
            const wire = new this.occt.BRepBuilderAPI_MakeWire();
            wire.Add(edge.Edge());
            const shape = wire.Shape();
            const handle = this.shapeUtils.createHandle(shape, "wire");
            centerPnt.delete();
            normalDir.delete();
            axis.delete();
            circle.delete();
            edge.delete();
            wire.delete();
            return handle;
        }, this.logger);
    }
    createRectangle(params = {}) {
        return timed("createRectangle", () => {
            const { center = { x: 0, y: 0, z: 0 }, width = 100, height = 100, } = params;
            const p1 = this.vec3.createPoint({
                x: center.x - width / 2,
                y: center.y - height / 2,
                z: center.z,
            });
            const p2 = this.vec3.createPoint({
                x: center.x + width / 2,
                y: center.y - height / 2,
                z: center.z,
            });
            const p3 = this.vec3.createPoint({
                x: center.x + width / 2,
                y: center.y + height / 2,
                z: center.z,
            });
            const p4 = this.vec3.createPoint({
                x: center.x - width / 2,
                y: center.y + height / 2,
                z: center.z,
            });
            const wire = new this.occt.BRepBuilderAPI_MakeWire();
            const e1 = new this.occt.BRepBuilderAPI_MakeEdge(p1, p2);
            const e2 = new this.occt.BRepBuilderAPI_MakeEdge(p2, p3);
            const e3 = new this.occt.BRepBuilderAPI_MakeEdge(p3, p4);
            const e4 = new this.occt.BRepBuilderAPI_MakeEdge(p4, p1);
            wire.Add(e1.Edge());
            wire.Add(e2.Edge());
            wire.Add(e3.Edge());
            wire.Add(e4.Edge());
            const shape = wire.Shape();
            const handle = this.shapeUtils.createHandle(shape, "wire");
            p1.delete();
            p2.delete();
            p3.delete();
            p4.delete();
            e1.delete();
            e2.delete();
            e3.delete();
            e4.delete();
            wire.delete();
            return handle;
        }, this.logger);
    }
    createPolygon(params) {
        return timed("createPolygon", () => {
            const { points, closed = true } = params;
            if (points.length < 3) {
                throw new Error("Polygon requires at least 3 points");
            }
            const wire = new this.occt.BRepBuilderAPI_MakeWire();
            for (let i = 0; i < points.length; i++) {
                const current = points[i];
                const next = points[(i + 1) % points.length];
                if (i === points.length - 1 && !closed)
                    break;
                const p1 = new this.occt.gp_Pnt(current.x, current.y, current.z || 0);
                const p2 = new this.occt.gp_Pnt(next.x, next.y, next.z || 0);
                const line = new this.occt.GC_MakeSegment(p1, p2);
                if (line.IsDone()) {
                    const edge = new this.occt.BRepBuilderAPI_MakeEdge(line.Value(), line.Value());
                    edge.Build();
                    if (edge.IsDone()) {
                        wire.Add(edge.Shape());
                    }
                    edge.delete();
                }
                line.delete();
                p1.delete();
                p2.delete();
            }
            wire.Build();
            if (!wire.IsDone()) {
                throw new Error("Failed to create polygon");
            }
            const shape = wire.Shape();
            const handle = this.shapeUtils.createHandle(shape, "wire");
            wire.delete();
            return handle;
        }, this.logger);
    }
    createPoint(params = {}) {
        return timed("createPoint", () => {
            const { x = 0, y = 0, z = 0 } = params;
            const point = new this.occt.gp_Pnt(x, y, z);
            const vertex = new this.occt.BRepBuilderAPI_MakeVertex(point);
            vertex.Build();
            if (!vertex.IsDone()) {
                point.delete();
                throw new Error("Failed to create point");
            }
            const shape = vertex.Shape();
            const handle = this.shapeUtils.createHandle(shape, "point");
            point.delete();
            vertex.delete();
            return handle;
        }, this.logger);
    }
    createEllipse(params = {}) {
        return timed("createEllipse", () => {
            const { center = { x: 0, y: 0, z: 0 }, majorRadius = 50, minorRadius = 30, normal = { x: 0, y: 0, z: 1 }, } = params;
            const centerPnt = new this.occt.gp_Pnt(center.x, center.y, center.z);
            const normalDir = new this.occt.gp_Dir(normal.x, normal.y, normal.z);
            const axis = new this.occt.gp_Ax2(centerPnt, normalDir);
            const ellipse = new this.occt.gp_Elips(axis, majorRadius, minorRadius);
            const curve = new this.occt.GC_MakeEllipse(ellipse);
            if (!curve.IsDone()) {
                centerPnt.delete();
                normalDir.delete();
                axis.delete();
                ellipse.delete();
                throw new Error("Failed to create ellipse curve");
            }
            const edge = new this.occt.BRepBuilderAPI_MakeEdge(curve.Value(), curve.Value());
            edge.Build();
            if (!edge.IsDone()) {
                centerPnt.delete();
                normalDir.delete();
                axis.delete();
                ellipse.delete();
                curve.delete();
                throw new Error("Failed to create ellipse edge");
            }
            const shape = edge.Shape();
            const handle = this.shapeUtils.createHandle(shape, "curve");
            centerPnt.delete();
            normalDir.delete();
            axis.delete();
            ellipse.delete();
            curve.delete();
            edge.delete();
            return handle;
        }, this.logger);
    }
    createArc(params) {
        return timed("createArc", () => {
            const startPnt = this.vec3.createPoint(params.start);
            const centerPnt = this.vec3.createPoint(params.center);
            const endPnt = this.vec3.createPoint(params.end);
            const arc = new this.occt.GC_MakeArcOfCircle(startPnt, centerPnt, endPnt);
            if (!arc.IsDone()) {
                startPnt.delete();
                centerPnt.delete();
                endPnt.delete();
                throw new Error("Failed to create arc");
            }
            const edge = new this.occt.BRepBuilderAPI_MakeEdge(arc.Value(), arc.Value());
            edge.Build();
            if (!edge.IsDone()) {
                startPnt.delete();
                centerPnt.delete();
                endPnt.delete();
                arc.delete();
                throw new Error("Failed to create arc edge");
            }
            const shape = edge.Shape();
            const handle = this.shapeUtils.createHandle(shape, "curve");
            startPnt.delete();
            centerPnt.delete();
            endPnt.delete();
            arc.delete();
            edge.delete();
            return handle;
        }, this.logger);
    }
    // ===========================================================================
    // Boolean Operations
    // ===========================================================================
    booleanUnion(params) {
        return timed("booleanUnion", () => {
            const { shapes } = params;
            if (shapes.length < 2) {
                throw new Error("Union requires at least 2 shapes");
            }
            const firstShape = this.shapeUtils.getShape(shapes[0]);
            if (!firstShape)
                throw new Error("First shape not found");
            let result = firstShape;
            for (let i = 1; i < shapes.length; i++) {
                const tool = this.shapeUtils.getShape(shapes[i]);
                if (!tool)
                    continue;
                const fuse = new this.occt.BRepAlgoAPI_Fuse(result, tool);
                fuse.Build();
                if (i > 1) {
                    result.delete();
                }
                const newResult = fuse.Shape();
                fuse.delete();
                if (!newResult)
                    throw new Error("Boolean union operation failed");
                result = newResult;
            }
            return this.shapeUtils.createHandle(result, "solid");
        }, this.logger);
    }
    booleanSubtract(params) {
        return timed("booleanSubtract", () => {
            const base = this.shapeUtils.getShape(params.base);
            const { tools } = params;
            if (!base)
                throw new Error("Base shape not found");
            if (tools.length === 0)
                throw new Error("Subtract requires at least one tool");
            let result = base;
            for (const toolRef of tools) {
                const tool = this.shapeUtils.getShape(toolRef);
                if (!tool)
                    continue;
                const cut = new this.occt.BRepAlgoAPI_Cut(result, tool);
                cut.Build();
                if (result !== base) {
                    result.delete();
                }
                result = cut.Shape();
                cut.delete();
            }
            return this.shapeUtils.createHandle(result, "solid");
        }, this.logger);
    }
    booleanIntersect(params) {
        return timed("booleanIntersect", () => {
            const { shapes } = params;
            if (shapes.length < 2) {
                throw new Error("Intersect requires at least 2 shapes");
            }
            const firstShape = this.shapeUtils.getShape(shapes[0]);
            if (!firstShape)
                throw new Error("First shape not found");
            let result = firstShape;
            for (let i = 1; i < shapes.length; i++) {
                const tool = this.shapeUtils.getShape(shapes[i]);
                if (!tool)
                    continue;
                const common = new this.occt.BRepAlgoAPI_Common(result, tool);
                common.Build();
                if (i > 1) {
                    result.delete();
                }
                const newResult = common.Shape();
                common.delete();
                if (!newResult)
                    throw new Error("Boolean intersection operation failed");
                result = newResult;
            }
            return this.shapeUtils.createHandle(result, "solid");
        }, this.logger);
    }
    // ===========================================================================
    // Feature Operations
    // ===========================================================================
    extrude(params) {
        return timed("extrude", () => {
            const profile = this.shapeUtils.getShape(params.profile);
            if (!profile)
                throw new Error("Profile shape not found");
            const { direction = { x: 0, y: 0, z: 1 }, distance = 100 } = params;
            const vec = this.vec3.createVec3({
                x: direction.x * distance,
                y: direction.y * distance,
                z: direction.z * distance,
            });
            const prism = new this.occt.BRepPrimAPI_MakePrism(profile, vec);
            const shape = prism.Shape();
            const handle = this.shapeUtils.createHandle(shape, "solid");
            vec.delete();
            prism.delete();
            return handle;
        }, this.logger);
    }
    revolve(params) {
        return timed("revolve", () => {
            const profile = this.shapeUtils.getShape(params.profile);
            if (!profile)
                throw new Error("Profile shape not found");
            const { center = { x: 0, y: 0, z: 0 }, axis = { x: 0, y: 0, z: 1 }, angle = Math.PI * 2, } = params;
            const ax = this.vec3.createAxis(center, axis);
            const revolve = new this.occt.BRepPrimAPI_MakeRevol(profile, ax, angle);
            const shape = revolve.Shape();
            const handle = this.shapeUtils.createHandle(shape, "solid");
            ax.delete();
            revolve.delete();
            return handle;
        }, this.logger);
    }
    sweep(params) {
        return timed("sweep", () => {
            const profile = this.shapeUtils.getShape(params.profile);
            const path = this.shapeUtils.getShape(params.path);
            if (!profile || !path)
                throw new Error("Profile or path shape not found");
            const sweep = new this.occt.BRepOffsetAPI_MakePipe(path, profile);
            const shape = sweep.Shape();
            const handle = this.shapeUtils.createHandle(shape, "solid");
            sweep.delete();
            return handle;
        }, this.logger);
    }
    loft(params) {
        return timed("loft", () => {
            const { profiles, solid = true } = params;
            if (profiles.length < 2)
                throw new Error("Loft requires at least 2 profiles");
            const loft = new this.occt.BRepOffsetAPI_ThruSections(solid);
            for (const profileRef of profiles) {
                const profile = this.shapeUtils.getShape(profileRef);
                if (profile) {
                    loft.AddWire(profile);
                }
            }
            loft.Build();
            const shape = loft.Shape();
            const handle = this.shapeUtils.createHandle(shape, "solid");
            loft.delete();
            return handle;
        }, this.logger);
    }
    fillet(params) {
        return timed("fillet", () => {
            const shape = this.shapeUtils.getShape(params.shape);
            if (!shape)
                throw new Error("Shape not found");
            const { radius = 5 } = params;
            const fillet = new this.occt.BRepFilletAPI_MakeFillet(shape);
            const explorer = new this.occt.TopExp_Explorer(shape, this.occt.TopAbs_EDGE);
            while (explorer.More()) {
                fillet.Add(radius, explorer.Current());
                explorer.Next();
            }
            fillet.Build();
            const result = fillet.Shape();
            const handle = this.shapeUtils.createHandle(result, "solid");
            explorer.delete();
            fillet.delete();
            return handle;
        }, this.logger);
    }
    chamfer(params) {
        return timed("chamfer", () => {
            const shape = this.shapeUtils.getShape(params.shape);
            if (!shape)
                throw new Error("Shape not found");
            const { distance = 5 } = params;
            const chamfer = new this.occt.BRepFilletAPI_MakeChamfer(shape);
            const explorer = new this.occt.TopExp_Explorer(shape, this.occt.TopAbs_EDGE);
            while (explorer.More()) {
                chamfer.Add(distance, explorer.Current());
                explorer.Next();
            }
            chamfer.Build();
            const result = chamfer.Shape();
            const handle = this.shapeUtils.createHandle(result, "solid");
            explorer.delete();
            chamfer.delete();
            return handle;
        }, this.logger);
    }
    shell(params) {
        return timed("shell", () => {
            const shape = this.shapeUtils.getShape(params.shape);
            if (!shape)
                throw new Error("Shape not found");
            const { thickness = -5 } = params;
            const faces = new this.occt.TopTools_ListOfShape();
            const explorer = new this.occt.TopExp_Explorer(shape, this.occt.TopAbs_FACE);
            if (explorer.More()) {
                faces.Append(explorer.Current());
            }
            const shell = new this.occt.BRepOffsetAPI_MakeThickSolid();
            shell.MakeThickSolidByJoin(shape, faces, thickness, 1.0e-3);
            const result = shell.Shape();
            const handle = this.shapeUtils.createHandle(result, "solid");
            faces.delete();
            explorer.delete();
            shell.delete();
            return handle;
        }, this.logger);
    }
    offset(params) {
        return timed("offset", () => {
            const shape = this.shapeUtils.getShape(params.shape);
            if (!shape)
                throw new Error("Shape not found");
            const { distance = 1.0 } = params;
            const offset = new this.occt.BRepOffsetAPI_MakeOffsetShape();
            offset.PerformByJoin(shape, distance, 1e-7);
            if (!offset.IsDone()) {
                offset.delete();
                throw new Error("Failed to create offset shape");
            }
            const result = offset.Shape();
            const handle = this.shapeUtils.createHandle(result, "solid");
            offset.delete();
            return handle;
        }, this.logger);
    }
    draft(params) {
        return timed("draft", () => {
            const shape = this.shapeUtils.getShape(params.shape);
            if (!shape)
                throw new Error("Shape not found");
            const { direction = { x: 0, y: 0, z: 1 }, angle = (Math.PI / 180) * 5, // Default 5 degrees
             } = params;
            const dirVec = this.vec3.createDir(direction);
            const draft = new this.occt.BRepOffsetAPI_DraftAngle(shape);
            // Add all faces with the specified angle
            const explorer = new this.occt.TopExp_Explorer(shape, this.occt.TopAbs_FACE);
            while (explorer.More()) {
                draft.Add(explorer.Current(), dirVec, angle);
                explorer.Next();
            }
            draft.Build();
            if (!draft.IsDone()) {
                dirVec.delete();
                explorer.delete();
                draft.delete();
                throw new Error("Failed to create draft");
            }
            const result = draft.Shape();
            const handle = this.shapeUtils.createHandle(result, "solid");
            dirVec.delete();
            explorer.delete();
            draft.delete();
            return handle;
        }, this.logger);
    }
    // ===========================================================================
    // Transformations
    // ===========================================================================
    transform(params) {
        return timed("transform", () => {
            const shape = this.shapeUtils.getShape(params.shape);
            if (!shape)
                throw new Error("Shape not found");
            const trsf = new this.occt.gp_Trsf();
            const matrix = Array.isArray(params.matrix)
                ? params.matrix
                : [
                    params.matrix.m11 || 1,
                    params.matrix.m12 || 0,
                    params.matrix.m13 || 0,
                    params.matrix.m14 || 0,
                    params.matrix.m21 || 0,
                    params.matrix.m22 || 1,
                    params.matrix.m23 || 0,
                    params.matrix.m24 || 0,
                    params.matrix.m31 || 0,
                    params.matrix.m32 || 0,
                    params.matrix.m33 || 1,
                    params.matrix.m34 || 0,
                    params.matrix.m41 || 0,
                    params.matrix.m42 || 0,
                    params.matrix.m43 || 0,
                    params.matrix.m44 || 1,
                ];
            // OCCT uses 3x4 transformation matrix
            trsf.SetValues(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5], matrix[6], matrix[7], matrix[8], matrix[9], matrix[10], matrix[11]);
            const transformer = new this.occt.BRepBuilderAPI_Transform(shape, trsf, true);
            const result = transformer.Shape();
            const handle = this.shapeUtils.createHandle(result, "solid");
            trsf.delete();
            transformer.delete();
            return handle;
        }, this.logger);
    }
    translate(params) {
        return timed("translate", () => {
            const shape = this.shapeUtils.getShape(params.shape);
            if (!shape)
                throw new Error("Shape not found");
            const vec = this.vec3.createVec3(params.vector);
            const trsf = new this.occt.gp_Trsf();
            trsf.SetTranslation(vec);
            const transformer = new this.occt.BRepBuilderAPI_Transform(shape, trsf, true);
            const result = transformer.Shape();
            const handle = this.shapeUtils.createHandle(result, "solid");
            vec.delete();
            trsf.delete();
            transformer.delete();
            return handle;
        }, this.logger);
    }
    rotate(params) {
        return timed("rotate", () => {
            const shape = this.shapeUtils.getShape(params.shape);
            if (!shape)
                throw new Error("Shape not found");
            const { center = { x: 0, y: 0, z: 0 }, axis = { x: 0, y: 0, z: 1 }, angle, } = params;
            const ax = this.vec3.createAxis(center, axis);
            const trsf = new this.occt.gp_Trsf();
            trsf.SetRotation(ax.Axis(), angle);
            const transformer = new this.occt.BRepBuilderAPI_Transform(shape, trsf, true);
            const result = transformer.Shape();
            const handle = this.shapeUtils.createHandle(result, "solid");
            ax.delete();
            trsf.delete();
            transformer.delete();
            return handle;
        }, this.logger);
    }
    scale(params) {
        return timed("scale", () => {
            const shape = this.shapeUtils.getShape(params.shape);
            if (!shape)
                throw new Error("Shape not found");
            const { center = { x: 0, y: 0, z: 0 }, factor } = params;
            const centerPnt = this.vec3.createPoint(center);
            const trsf = new this.occt.gp_Trsf();
            trsf.SetScale(centerPnt, factor);
            const transformer = new this.occt.BRepBuilderAPI_Transform(shape, trsf, true);
            const result = transformer.Shape();
            const handle = this.shapeUtils.createHandle(result, "solid");
            centerPnt.delete();
            trsf.delete();
            transformer.delete();
            return handle;
        }, this.logger);
    }
    mirror(params) {
        return timed("mirror", () => {
            const shape = this.shapeUtils.getShape(params.shape);
            if (!shape)
                throw new Error("Shape not found");
            const { point = { x: 0, y: 0, z: 0 }, normal = { x: 0, y: 0, z: 1 } } = params;
            const pointPnt = this.vec3.createPoint(point);
            const normalDir = this.vec3.createDir(normal);
            const plane = new this.occt.gp_Ax2(pointPnt, normalDir);
            const trsf = new this.occt.gp_Trsf();
            trsf.SetMirror(plane.Ax2());
            const transformer = new this.occt.BRepBuilderAPI_Transform(shape, trsf, true);
            const result = transformer.Shape();
            const handle = this.shapeUtils.createHandle(result, "solid");
            pointPnt.delete();
            normalDir.delete();
            plane.delete();
            trsf.delete();
            transformer.delete();
            return handle;
        }, this.logger);
    }
    // ===========================================================================
    // Analysis
    // ===========================================================================
    tessellate(shapeOrId, options = {}) {
        return timed("tessellate", () => {
            const shape = this.shapeUtils.getShape(shapeOrId);
            if (!shape)
                throw new Error("Shape not found");
            const { deflection = 0.1, angle = 0.5 } = options;
            const mesher = new this.occt.BRepMesh_IncrementalMesh(shape, deflection, false, angle);
            mesher.Perform();
            const location = new this.occt.TopLoc_Location();
            const positions = [];
            const normals = [];
            const indices = [];
            const explorer = new this.occt.TopExp_Explorer(shape, this.occt.TopAbs_FACE);
            let indexOffset = 0;
            while (explorer.More()) {
                const face = this.occt.TopoDS.Face(explorer.Current());
                const tri = this.occt.BRep_Tool.Triangulation(face, location);
                if (tri && !tri.IsNull()) {
                    const nodes = tri.Nodes();
                    const triangles = tri.Triangles();
                    for (let i = 1; i <= nodes.Length(); i++) {
                        const node = nodes.Value(i);
                        positions.push(node.X(), node.Y(), node.Z());
                        normals.push(0, 0, 1); // Simplified - should compute from face
                    }
                    for (let i = 1; i <= triangles.Length(); i++) {
                        const triangle = triangles.Value(i);
                        indices.push(triangle.Value(1) - 1 + indexOffset, triangle.Value(2) - 1 + indexOffset, triangle.Value(3) - 1 + indexOffset);
                    }
                    indexOffset += nodes.Length();
                }
                explorer.Next();
            }
            mesher.delete();
            location.delete();
            explorer.delete();
            return {
                positions: new Float32Array(positions),
                normals: new Float32Array(normals),
                indices: new Uint32Array(indices),
            };
        }, this.logger);
    }
    getProperties(shapeOrId) {
        return timed("getProperties", () => {
            const shape = this.shapeUtils.getShape(shapeOrId);
            if (!shape)
                throw new Error("Shape not found");
            const props = new this.occt.GProp_GProps();
            const calculator = new this.occt.BRepGProp();
            calculator.VolumeProperties(shape, props);
            const volume = props.Mass();
            const center = props.CentreOfMass();
            // Get surface area
            calculator.SurfaceProperties(shape, props);
            const surfaceArea = props.Mass();
            const result = {
                volume,
                surfaceArea,
                centerOfMass: {
                    x: center.X(),
                    y: center.Y(),
                    z: center.Z(),
                },
                boundingBox: this.shapeUtils.calculateBounds(shape),
            };
            props.delete();
            calculator.delete();
            return result;
        }, this.logger);
    }
    getVolume(shapeOrId) {
        return timed("getVolume", () => {
            const shape = this.shapeUtils.getShape(shapeOrId);
            if (!shape)
                throw new Error("Shape not found");
            const props = new this.occt.GProp_GProps();
            const calculator = new this.occt.BRepGProp();
            calculator.VolumeProperties(shape, props);
            const volume = props.Mass();
            props.delete();
            calculator.delete();
            return volume;
        }, this.logger);
    }
    getSurfaceArea(shapeOrId) {
        return timed("getSurfaceArea", () => {
            const shape = this.shapeUtils.getShape(shapeOrId);
            if (!shape)
                throw new Error("Shape not found");
            const props = new this.occt.GProp_GProps();
            const calculator = new this.occt.BRepGProp();
            calculator.SurfaceProperties(shape, props);
            const area = props.Mass();
            props.delete();
            calculator.delete();
            return area;
        }, this.logger);
    }
    getBoundingBox(shapeOrId) {
        return timed("getBoundingBox", () => {
            const shape = this.shapeUtils.getShape(shapeOrId);
            if (!shape)
                throw new Error("Shape not found");
            return this.shapeUtils.calculateBounds(shape);
        }, this.logger);
    }
    // ===========================================================================
    // Zero-Lag Optimization
    // ===========================================================================
    /**
     * Estimate the complexity of an operation before executing it.
     * Used for deciding whether to run locally or offload to remote compute.
     */
    estimateComplexity(operation, shapeIds) {
        // Simple heuristic based on operation type and shape count
        const operationWeights = {
            // Instant operations (<16ms)
            makeBox: 0.05,
            makeSphere: 0.05,
            makeCylinder: 0.05,
            makeCone: 0.05,
            makeTorus: 0.05,
            translate: 0.02,
            rotate: 0.02,
            scale: 0.02,
            mirror: 0.02,
            // Interactive operations (<100ms)
            booleanUnion: 0.3,
            booleanSubtract: 0.35,
            booleanIntersect: 0.3,
            extrude: 0.15,
            revolve: 0.2,
            // Background operations (<1s)
            fillet: 0.5,
            chamfer: 0.4,
            shell: 0.6,
            sweep: 0.5,
            loft: 0.6,
            offset: 0.5,
            // Heavy operations (>1s) - consider remote
            tessellate: 0.4, // Depends heavily on mesh density
        };
        const baseWeight = operationWeights[operation] || 0.5;
        const shapeCount = shapeIds.length;
        // Increase complexity with more shapes
        const score = Math.min(1, baseWeight * (1 + shapeCount * 0.1));
        // Rough time estimates
        const estimatedMs = score < 0.1
            ? 5
            : score < 0.3
                ? 50
                : score < 0.6
                    ? 200
                    : score < 0.8
                        ? 500
                        : 2000;
        // Memory estimate (rough)
        const estimatedBytes = shapeCount * 50000 * score;
        // Recommend remote for heavy operations
        const recommendedLocation = score > 0.7 ? "remote" : "local";
        return {
            score,
            estimatedMs,
            estimatedBytes,
            recommendedLocation,
        };
    }
    /**
     * Precompute hints for speculative execution.
     * Call this when user hovers over tools to warm up the cache.
     */
    precompute(operation, shapeIds) {
        // This would trigger background computation in a real implementation
        this.logger.debug(`Precompute hint: ${operation} with ${shapeIds.length} shapes`);
    }
    // ===========================================================================
    // Additional Analysis Operations
    // ===========================================================================
    getCenterOfMass(shapeOrId) {
        return timed("getCenterOfMass", () => {
            const shape = this.shapeUtils.getShape(shapeOrId);
            if (!shape)
                throw new Error("Shape not found");
            const props = new this.occt.GProp_GProps();
            const calculator = new this.occt.BRepGProp();
            calculator.VolumeProperties(shape, props);
            const center = props.CentreOfMass();
            const result = {
                x: center.X(),
                y: center.Y(),
                z: center.Z(),
            };
            props.delete();
            calculator.delete();
            return result;
        }, this.logger);
    }
    // ===========================================================================
    // I/O Operations
    // ===========================================================================
    /**
     * Import geometry from file data
     * Note: This is a stub implementation - actual OCCT I/O requires
     * additional WASM bindings for STEPControl, IGESControl, etc.
     */
    importFile(params) {
        return timed("importFile", () => {
            const { data, format, filename } = params;
            // Validate input
            if (!data) {
                throw new Error("Import data is required");
            }
            // Note: Full implementation requires OCCT I/O modules
            // This is a placeholder that would need:
            // - STEPControl_Reader for STEP
            // - IGESControl_Reader for IGES
            // - BRepTools::Read for BREP
            this.logger.warn(`Import ${format} is a placeholder - requires OCCT I/O bindings`);
            // For now, return empty result
            // In production, this would parse the file and create shapes
            return {
                shapes: [],
                metadata: {
                    format,
                    filename,
                    importedAt: Date.now(),
                },
            };
        }, this.logger);
    }
    /**
     * Export geometry to file data
     * Note: This is a stub implementation - actual OCCT I/O requires
     * additional WASM bindings for STEPControl, StlAPI, etc.
     */
    exportFile(params) {
        return timed("exportFile", () => {
            const shape = this.shapeUtils.getShape(params.shape);
            if (!shape)
                throw new Error("Shape not found");
            const { format, options = {} } = params;
            // Note: Full implementation requires OCCT I/O modules
            // This is a placeholder that would need:
            // - STEPControl_Writer for STEP
            // - StlAPI_Writer for STL
            // - IGESControl_Writer for IGES
            // - BRepTools::Write for BREP
            this.logger.warn(`Export ${format} is a placeholder - requires OCCT I/O bindings`);
            // For STL, we can generate from tessellation
            if (format === "stl") {
                const meshResult = this.tessellate(params.shape, {
                    deflection: options.deflection || 0.1,
                });
                if (meshResult.success && meshResult.value) {
                    const mesh = meshResult.value;
                    const stlData = this.generateSTL(mesh, options.binary !== false);
                    return {
                        data: stlData,
                        format: "stl",
                        filename: `export_${Date.now()}.stl`,
                    };
                }
            }
            // For other formats, return placeholder
            return {
                data: "",
                format,
                filename: `export_${Date.now()}.${format}`,
            };
        }, this.logger);
    }
    /**
     * Generate STL data from mesh
     */
    generateSTL(mesh, binary) {
        const { positions, indices } = mesh;
        if (binary) {
            // Binary STL format
            const triangleCount = indices.length / 3;
            const bufferSize = 84 + triangleCount * 50; // 80 header + 4 count + 50 per triangle
            const buffer = new ArrayBuffer(bufferSize);
            const view = new DataView(buffer);
            // Header (80 bytes)
            const header = "geom-core STL export";
            for (let i = 0; i < 80; i++) {
                view.setUint8(i, i < header.length ? header.charCodeAt(i) : 0);
            }
            // Triangle count
            view.setUint32(80, triangleCount, true);
            let offset = 84;
            for (let i = 0; i < indices.length; i += 3) {
                const i0 = indices[i] * 3;
                const i1 = indices[i + 1] * 3;
                const i2 = indices[i + 2] * 3;
                // Calculate normal
                const v0 = [positions[i0], positions[i0 + 1], positions[i0 + 2]];
                const v1 = [positions[i1], positions[i1 + 1], positions[i1 + 2]];
                const v2 = [positions[i2], positions[i2 + 1], positions[i2 + 2]];
                const e1 = [v1[0] - v0[0], v1[1] - v0[1], v1[2] - v0[2]];
                const e2 = [v2[0] - v0[0], v2[1] - v0[1], v2[2] - v0[2]];
                const normal = [
                    e1[1] * e2[2] - e1[2] * e2[1],
                    e1[2] * e2[0] - e1[0] * e2[2],
                    e1[0] * e2[1] - e1[1] * e2[0],
                ];
                const len = Math.sqrt(normal[0] ** 2 + normal[1] ** 2 + normal[2] ** 2);
                if (len > 0) {
                    normal[0] /= len;
                    normal[1] /= len;
                    normal[2] /= len;
                }
                // Normal
                view.setFloat32(offset, normal[0], true);
                offset += 4;
                view.setFloat32(offset, normal[1], true);
                offset += 4;
                view.setFloat32(offset, normal[2], true);
                offset += 4;
                // Vertices
                view.setFloat32(offset, v0[0], true);
                offset += 4;
                view.setFloat32(offset, v0[1], true);
                offset += 4;
                view.setFloat32(offset, v0[2], true);
                offset += 4;
                view.setFloat32(offset, v1[0], true);
                offset += 4;
                view.setFloat32(offset, v1[1], true);
                offset += 4;
                view.setFloat32(offset, v1[2], true);
                offset += 4;
                view.setFloat32(offset, v2[0], true);
                offset += 4;
                view.setFloat32(offset, v2[1], true);
                offset += 4;
                view.setFloat32(offset, v2[2], true);
                offset += 4;
                // Attribute byte count
                view.setUint16(offset, 0, true);
                offset += 2;
            }
            return buffer;
        }
        else {
            // ASCII STL format
            let stl = "solid geom-core\n";
            for (let i = 0; i < indices.length; i += 3) {
                const i0 = indices[i] * 3;
                const i1 = indices[i + 1] * 3;
                const i2 = indices[i + 2] * 3;
                const v0 = [positions[i0], positions[i0 + 1], positions[i0 + 2]];
                const v1 = [positions[i1], positions[i1 + 1], positions[i1 + 2]];
                const v2 = [positions[i2], positions[i2 + 1], positions[i2 + 2]];
                // Calculate normal
                const e1 = [v1[0] - v0[0], v1[1] - v0[1], v1[2] - v0[2]];
                const e2 = [v2[0] - v0[0], v2[1] - v0[1], v2[2] - v0[2]];
                const normal = [
                    e1[1] * e2[2] - e1[2] * e2[1],
                    e1[2] * e2[0] - e1[0] * e2[2],
                    e1[0] * e2[1] - e1[1] * e2[0],
                ];
                const len = Math.sqrt(normal[0] ** 2 + normal[1] ** 2 + normal[2] ** 2);
                if (len > 0) {
                    normal[0] /= len;
                    normal[1] /= len;
                    normal[2] /= len;
                }
                stl += `  facet normal ${normal[0]} ${normal[1]} ${normal[2]}\n`;
                stl += "    outer loop\n";
                stl += `      vertex ${v0[0]} ${v0[1]} ${v0[2]}\n`;
                stl += `      vertex ${v1[0]} ${v1[1]} ${v1[2]}\n`;
                stl += `      vertex ${v2[0]} ${v2[1]} ${v2[2]}\n`;
                stl += "    endloop\n";
                stl += "  endfacet\n";
            }
            stl += "endsolid geom-core\n";
            return stl;
        }
    }
    // ===========================================================================
    // Assembly Operations
    // ===========================================================================
    assemblies = new Map();
    assemblyIdCounter = 1;
    generateAssemblyId() {
        return `assembly_${this.assemblyIdCounter++}`;
    }
    createAssembly(params = {}) {
        return timed("createAssembly", () => {
            const { name = "Assembly", parts = [], visible = true } = params;
            const assemblyId = this.generateAssemblyId();
            const assemblyParts = parts.map((part) => ({
                id: getShapeId(part),
                type: "Shape",
            }));
            const assembly = {
                id: assemblyId,
                name,
                parts: assemblyParts,
                mates: [],
                visible,
                hash: `${assemblyId}_${Date.now()}`,
            };
            this.assemblies.set(assemblyId, assembly);
            return assembly;
        }, this.logger);
    }
    createMate(params) {
        return timed("createMate", () => {
            const assemblyId = typeof params.assembly === "string"
                ? params.assembly
                : params.assembly.id;
            const assembly = this.assemblies.get(assemblyId);
            if (!assembly)
                throw new Error("Assembly not found");
            const { part1, part2, mateType = "coincident", axis1, axis2, distance, angle, } = params;
            const mateId = `mate_${Date.now()}_${assembly.mates.length}`;
            const mate = {
                id: mateId,
                type: mateType,
                part1: getShapeId(part1),
                part2: getShapeId(part2),
                axis1,
                axis2,
                distance,
                angle,
            };
            assembly.mates.push(mate);
            assembly.hash = `${assemblyId}_${Date.now()}`;
            return assembly;
        }, this.logger);
    }
    createPattern(params) {
        return timed("createPattern", () => {
            const assemblyId = typeof params.assembly === "string"
                ? params.assembly
                : params.assembly.id;
            const assembly = this.assemblies.get(assemblyId);
            if (!assembly)
                throw new Error("Assembly not found");
            const { part, patternType = "linear", count = 3, spacing = 50, axis = { x: 1, y: 0, z: 0 }, angle = 45, } = params;
            const originalPartId = getShapeId(part);
            const instanceIds = [];
            // Create pattern instances
            for (let i = 1; i < count; i++) {
                let transform;
                if (patternType === "linear") {
                    transform = {
                        translation: {
                            x: axis.x * spacing * i,
                            y: axis.y * spacing * i,
                            z: axis.z * spacing * i,
                        },
                        rotation: { x: 0, y: 0, z: 0 },
                        scale: 1.0,
                    };
                }
                else if (patternType === "circular") {
                    const angleRad = (angle * i * Math.PI) / 180;
                    transform = {
                        translation: { x: 0, y: 0, z: 0 },
                        rotation: { x: 0, y: 0, z: angleRad },
                        scale: 1.0,
                    };
                }
                else {
                    // rectangular pattern
                    const cols = Math.ceil(Math.sqrt(count));
                    const row = Math.floor(i / cols);
                    const col = i % cols;
                    transform = {
                        translation: {
                            x: col * spacing,
                            y: row * spacing,
                            z: 0,
                        },
                        rotation: { x: 0, y: 0, z: 0 },
                        scale: 1.0,
                    };
                }
                const instanceId = `pattern_${originalPartId}_${i}`;
                instanceIds.push(instanceId);
                assembly.parts.push({
                    id: instanceId,
                    type: "Shape",
                    originalId: originalPartId,
                    transform,
                    patternInstance: true,
                });
            }
            assembly.hash = `${assemblyId}_${Date.now()}`;
            return {
                assembly,
                instanceIds,
            };
        }, this.logger);
    }
    getAssembly(assemblyId) {
        return this.assemblies.get(assemblyId);
    }
    deleteAssembly(assemblyId) {
        return this.assemblies.delete(assemblyId);
    }
}
// =============================================================================
// Factory Function
// =============================================================================
export function createGeometryEngine(occt) {
    return new GeometryEngine(occt);
}
//# sourceMappingURL=GeometryEngine.js.map