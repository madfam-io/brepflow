import { createHandleId } from '@brepflow/types';
import type { WorkerAPI, ShapeHandle, MeshData, BoundingBox } from '@brepflow/types';
import { getOCCTWrapper, type RawShapeHandle } from './occt-wrapper';

interface TessellatePayload {
  shape: ShapeHandle | string;
  tolerance?: number;
  deflection?: number;
}

interface TessellateResult {
  mesh: MeshData;
  bbox: BoundingBox;
}

/**
 * Geometry API that talks directly to the real OCCT wasm bindings.
 * No mock fallbacks are provided – errors bubble up so callers can react.
 */
export class GeometryAPI implements WorkerAPI {
  private initialized = false;
  private readonly occtWrapper = getOCCTWrapper();
  private readonly rawShapeCache = new Map<string, RawShapeHandle>();
  private readonly handleCache = new Map<string, ShapeHandle>();
  private readonly meshCache = new Map<string, MeshData>();

  async init(): Promise<void> {
    if (this.initialized) return;
    await this.occtWrapper.initialize();
    this.initialized = true;
  }

  get isInitialized(): boolean {
    return this.initialized;
  }

  async invoke<T = any>(operation: string, params: any): Promise<T> {
    await this.init();

    switch (operation) {
      case 'MAKE_BOX':
        return this.makeBox(params) as unknown as T;
      case 'MAKE_SPHERE':
        return this.makeSphere(params) as unknown as T;
      case 'MAKE_CYLINDER':
        return this.makeCylinder(params) as unknown as T;
      case 'MAKE_CONE':
        return this.makeCone(params) as unknown as T;
      case 'MAKE_TORUS':
        return this.makeTorus(params) as unknown as T;

      case 'BOOLEAN_UNION':
      case 'BOOLEAN_FUSE':
        return this.booleanUnion(params) as unknown as T;
      case 'BOOLEAN_DIFFERENCE':
      case 'BOOLEAN_CUT':
        return this.booleanDifference(params) as unknown as T;
      case 'BOOLEAN_INTERSECTION':
      case 'BOOLEAN_COMMON':
        return this.booleanIntersection(params) as unknown as T;

      case 'MAKE_FILLET':
        return this.makeFillet(params) as unknown as T;
      case 'MAKE_CHAMFER':
        return this.makeChamfer(params) as unknown as T;

      case 'TESSELLATE':
        return this.tessellate(params) as unknown as T;

      case 'EXPORT_STEP':
        return this.exportSTEP(params) as unknown as T;
      case 'EXPORT_IGES':
        return this.exportIGES(params) as unknown as T;
      case 'EXPORT_OBJ':
        return this.exportOBJ(params) as unknown as T;
      case 'EXPORT_STL':
        return this.exportSTL(params) as unknown as T;

      case 'IMPORT_STEP':
        return this.importSTEP(params) as unknown as T;

      default:
        throw new Error(`Unsupported geometry operation: ${operation}`);
    }
  }

  // === Primitive creation ===

  private makeBox(params: any): ShapeHandle {
    const { width = 100, height = 100, depth = 100 } = params ?? {};
    const raw = this.occtWrapper.makeBox(width, height, depth);
    return this.registerHandle(raw, 'solid');
  }

  private makeSphere(params: any): ShapeHandle {
    const { radius = 50 } = params ?? {};
    const raw = this.occtWrapper.makeSphere(radius);
    return this.registerHandle(raw, 'solid');
  }

  private makeCylinder(params: any): ShapeHandle {
    const { radius = 50, height = 100 } = params ?? {};
    const raw = this.occtWrapper.makeCylinder(radius, height);
    return this.registerHandle(raw, 'solid');
  }

  private makeCone(params: any): ShapeHandle {
    const { radius1 = 50, radius2 = 25, height = 100 } = params ?? {};
    const raw = this.occtWrapper.makeCone(radius1, radius2, height);
    return this.registerHandle(raw, 'solid');
  }

  private makeTorus(params: any): ShapeHandle {
    const { majorRadius = 50, minorRadius = 20 } = params ?? {};
    const raw = this.occtWrapper.makeTorus(majorRadius, minorRadius);
    return this.registerHandle(raw, 'solid');
  }

  // === Boolean operations ===

  private booleanUnion(params: any): ShapeHandle {
    const shapes: Array<ShapeHandle | string> = params?.shapes ?? [];
    if (shapes.length < 2) {
      throw new Error('BOOLEAN_UNION requires at least two shapes');
    }

    let current = this.registerHandle(
      this.occtWrapper.booleanUnion(shapes[0], shapes[1]),
      'boolean_union'
    );

    for (let i = 2; i < shapes.length; i++) {
      current = this.registerHandle(
        this.occtWrapper.booleanUnion(current, shapes[i]),
        'boolean_union'
      );
    }

    return current;
  }

  private booleanDifference(params: any): ShapeHandle {
    const { shape1, shape2 } = params ?? {};
    if (!shape1 || !shape2) {
      throw new Error('BOOLEAN_DIFFERENCE requires a base shape and a tool shape');
    }

    const raw = this.occtWrapper.booleanSubtract(shape1, shape2);
    return this.registerHandle(raw, 'boolean_difference');
  }

  private booleanIntersection(params: any): ShapeHandle {
    const shapes: Array<ShapeHandle | string> = params?.shapes ?? [];
    if (shapes.length < 2) {
      throw new Error('BOOLEAN_INTERSECTION requires at least two shapes');
    }

    let current = this.registerHandle(
      this.occtWrapper.booleanIntersect(shapes[0], shapes[1]),
      'boolean_intersection'
    );

    for (let i = 2; i < shapes.length; i++) {
      current = this.registerHandle(
        this.occtWrapper.booleanIntersect(current, shapes[i]),
        'boolean_intersection'
      );
    }

    return current;
  }

  // === Feature operations ===

  private makeFillet(params: any): ShapeHandle {
    const { shape, radius = 5 } = params ?? {};
    if (!shape) {
      throw new Error('MAKE_FILLET requires a shape');
    }

    const raw = this.occtWrapper.makeFillet(shape, radius);
    return this.registerHandle(raw, 'fillet');
  }

  private makeChamfer(params: any): ShapeHandle {
    const { shape, distance = 5 } = params ?? {};
    if (!shape) {
      throw new Error('MAKE_CHAMFER requires a shape');
    }

    const raw = this.occtWrapper.makeChamfer(shape, distance);
    return this.registerHandle(raw, 'chamfer');
  }

  // === Tessellation ===

  private tessellate(params: TessellatePayload): TessellateResult {
    const { shape, tolerance = params?.deflection ?? 0.01 } = params ?? {};
    if (!shape) {
      throw new Error('TESSELLATE requires a shape');
    }

    const handle = this.resolveHandle(shape);
    const shapeId = this.resolveId(shape);
    const cacheKey = `${shapeId}:${tolerance}`;

    const cachedMesh = this.meshCache.get(cacheKey);
    if (cachedMesh) {
      return {
        mesh: cachedMesh,
        bbox: this.extractBoundingBox(handle)
      };
    }

    const mesh = this.occtWrapper.tessellate(shape, tolerance, params?.deflection ?? 0.5);
    this.meshCache.set(cacheKey, mesh);

    return {
      mesh,
      bbox: this.extractBoundingBox(handle)
    };
  }

  // === Import/Export ===

  private exportSTEP(params: any): string {
    const { shape } = params ?? {};
    if (!shape) {
      throw new Error('EXPORT_STEP requires a shape');
    }
    return this.occtWrapper.exportSTEP(shape);
  }

  private exportIGES(params: any): string {
    const { shape } = params ?? {};
    if (!shape) {
      throw new Error('EXPORT_IGES requires a shape');
    }
    return this.occtWrapper.exportIGES(shape);
  }

  private exportOBJ(params: any): string {
    const { shape } = params ?? {};
    if (!shape) {
      throw new Error('EXPORT_OBJ requires a shape');
    }
    return this.occtWrapper.exportOBJ(shape);
  }

  private exportSTL(params: any): string {
    const { shape, binary = false } = params ?? {};
    if (!shape) {
      throw new Error('EXPORT_STL requires a shape');
    }
    return this.occtWrapper.exportSTL(shape, binary);
  }

  private importSTEP(params: any): ShapeHandle {
    const { data } = params ?? {};
    if (!data) {
      throw new Error('IMPORT_STEP requires STEP data');
    }

    const raw = this.occtWrapper.importSTEP(data);
    return this.registerHandle(raw, 'imported_step');
  }

  // === Handle management ===

  private registerHandle(raw: RawShapeHandle, fallbackType = 'solid'): ShapeHandle {
    const rawId = raw.id;
    if (!rawId || typeof rawId !== 'string') {
      throw new Error('OCCT returned a shape without an identifier');
    }

    const handle: ShapeHandle = {
      id: createHandleId(rawId),
      type: raw.type ?? fallbackType,
      hash: raw.hash,
      bbox: this.extractBoundingBox(raw),
      bbox_min_x: raw.bbox_min_x,
      bbox_min_y: raw.bbox_min_y,
      bbox_min_z: raw.bbox_min_z,
      bbox_max_x: raw.bbox_max_x,
      bbox_max_y: raw.bbox_max_y,
      bbox_max_z: raw.bbox_max_z,
      volume: raw.volume,
      area: raw.area,
      centerX: raw.centerX,
      centerY: raw.centerY,
      centerZ: raw.centerZ,
      metadata: {
        ...(raw.metadata ?? {}),
        rawId,
      },
    };

    this.rawShapeCache.set(rawId, raw);
    this.handleCache.set(rawId, handle);
    return handle;
  }

  private resolveHandle(handle: ShapeHandle | string): ShapeHandle {
    if (typeof handle !== 'string') {
      return handle;
    }

    const cached = this.handleCache.get(handle);
    if (!cached) {
      throw new Error(`Unknown shape handle: ${handle}`);
    }
    return cached;
  }

  private resolveId(handle: ShapeHandle | string): string {
    if (typeof handle === 'string') {
      return handle;
    }

    const metadataRaw = handle.metadata && (handle.metadata as Record<string, unknown>).rawId;
    if (typeof metadataRaw === 'string') {
      return metadataRaw;
    }

    return String(handle.id);
  }

  private extractBoundingBox(handle: ShapeHandle | RawShapeHandle): BoundingBox {
    const minX = handle.bbox_min_x ?? handle.bbox?.min.x;
    const minY = handle.bbox_min_y ?? handle.bbox?.min.y;
    const minZ = handle.bbox_min_z ?? handle.bbox?.min.z;
    const maxX = handle.bbox_max_x ?? handle.bbox?.max.x;
    const maxY = handle.bbox_max_y ?? handle.bbox?.max.y;
    const maxZ = handle.bbox_max_z ?? handle.bbox?.max.z;

    if (
      typeof minX === 'number' && typeof minY === 'number' && typeof minZ === 'number' &&
      typeof maxX === 'number' && typeof maxY === 'number' && typeof maxZ === 'number'
    ) {
      return {
        min: { x: minX, y: minY, z: minZ },
        max: { x: maxX, y: maxY, z: maxZ }
      };
    }

    return {
      min: { x: 0, y: 0, z: 0 },
      max: { x: 0, y: 0, z: 0 }
    };
  }
}
