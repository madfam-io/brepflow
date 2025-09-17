import type { NodeDefinition, ShapeHandle } from '@brepflow/types';

/**
 * Variable Radius Fillet Node
 * Creates fillets with varying radius along edges
 */
export const VariableFilletNode: NodeDefinition<
  { shape: ShapeHandle; edges?: ShapeHandle[] },
  { shape: ShapeHandle },
  { startRadius: number; endRadius: number; transition: 'linear' | 'smooth' }
> = {
  id: 'Features::VariableFillet',
  name: 'Variable Fillet',
  description: 'Apply fillet with varying radius along edges',
  category: 'Features',
  inputs: {
    shape: { type: 'Shape', description: 'Shape to fillet' },
    edges: { type: 'Shape[]', description: 'Edges to fillet (optional, all if not specified)' }
  },
  outputs: {
    shape: { type: 'Shape', description: 'Filleted shape' }
  },
  params: {
    startRadius: { type: 'number', default: 5, min: 0, description: 'Start radius' },
    endRadius: { type: 'number', default: 10, min: 0, description: 'End radius' },
    transition: { 
      type: 'select', 
      default: 'linear', 
      options: ['linear', 'smooth'],
      description: 'Radius transition type' 
    }
  },
  async evaluate(ctx, inputs, params) {
    const result = await ctx.worker.invoke('VARIABLE_FILLET', {
      shapeId: inputs.shape.id,
      edgeIds: inputs.edges?.map(e => e.id),
      startRadius: params.startRadius,
      endRadius: params.endRadius,
      transition: params.transition
    });
    return { shape: result };
  }
};

/**
 * Face Blend Node
 * Creates smooth blends between faces
 */
export const FaceBlendNode: NodeDefinition<
  { shape: ShapeHandle; face1: ShapeHandle; face2: ShapeHandle },
  { shape: ShapeHandle },
  { radius: number; continuity: 'G0' | 'G1' | 'G2' }
> = {
  id: 'Features::FaceBlend',
  name: 'Face Blend',
  description: 'Create smooth blend between two faces',
  category: 'Features',
  inputs: {
    shape: { type: 'Shape', description: 'Base shape' },
    face1: { type: 'Shape', description: 'First face' },
    face2: { type: 'Shape', description: 'Second face' }
  },
  outputs: {
    shape: { type: 'Shape', description: 'Blended shape' }
  },
  params: {
    radius: { type: 'number', default: 10, min: 0, description: 'Blend radius' },
    continuity: { 
      type: 'select', 
      default: 'G1', 
      options: ['G0', 'G1', 'G2'],
      description: 'Continuity level (G0=position, G1=tangent, G2=curvature)' 
    }
  },
  async evaluate(ctx, inputs, params) {
    const result = await ctx.worker.invoke('FACE_BLEND', {
      shapeId: inputs.shape.id,
      face1Id: inputs.face1.id,
      face2Id: inputs.face2.id,
      radius: params.radius,
      continuity: params.continuity
    });
    return { shape: result };
  }
};

/**
 * Full Round Fillet Node
 * Creates a fillet that consumes an entire face
 */
export const FullRoundFilletNode: NodeDefinition<
  { shape: ShapeHandle; sideFace1: ShapeHandle; centerFace: ShapeHandle; sideFace2: ShapeHandle },
  { shape: ShapeHandle },
  Record<string, never>
> = {
  id: 'Features::FullRoundFillet',
  name: 'Full Round Fillet',
  description: 'Create a fillet that replaces center face',
  category: 'Features',
  inputs: {
    shape: { type: 'Shape', description: 'Base shape' },
    sideFace1: { type: 'Shape', description: 'First side face' },
    centerFace: { type: 'Shape', description: 'Face to be replaced' },
    sideFace2: { type: 'Shape', description: 'Second side face' }
  },
  outputs: {
    shape: { type: 'Shape', description: 'Filleted shape' }
  },
  params: {},
  async evaluate(ctx, inputs) {
    const result = await ctx.worker.invoke('FULL_ROUND_FILLET', {
      shapeId: inputs.shape.id,
      sideFace1Id: inputs.sideFace1.id,
      centerFaceId: inputs.centerFace.id,
      sideFace2Id: inputs.sideFace2.id
    });
    return { shape: result };
  }
};

/**
 * Setback Fillet Node
 * Creates fillets with setback corners at vertices
 */
export const SetbackFilletNode: NodeDefinition<
  { shape: ShapeHandle; edges: ShapeHandle[] },
  { shape: ShapeHandle },
  { radius: number; setback1: number; setback2: number }
> = {
  id: 'Features::SetbackFillet',
  name: 'Setback Fillet',
  description: 'Create fillets with vertex setbacks',
  category: 'Features',
  inputs: {
    shape: { type: 'Shape', description: 'Shape to fillet' },
    edges: { type: 'Shape[]', description: 'Edges to fillet' }
  },
  outputs: {
    shape: { type: 'Shape', description: 'Filleted shape' }
  },
  params: {
    radius: { type: 'number', default: 10, min: 0, description: 'Fillet radius' },
    setback1: { type: 'number', default: 5, min: 0, description: 'First vertex setback' },
    setback2: { type: 'number', default: 5, min: 0, description: 'Second vertex setback' }
  },
  async evaluate(ctx, inputs, params) {
    const result = await ctx.worker.invoke('SETBACK_FILLET', {
      shapeId: inputs.shape.id,
      edgeIds: inputs.edges.map(e => e.id),
      radius: params.radius,
      setback1: params.setback1,
      setback2: params.setback2
    });
    return { shape: result };
  }
};