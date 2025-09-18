
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  curve1: Wire;
  curve2: Wire;
}
interface Outputs {
  surface: Face;
}

export const RuledSurfaceNode: NodeDefinition<RuledSurfaceInputs, RuledSurfaceOutputs, RuledSurfaceParams> = {
  type: 'Solid::RuledSurface',
  category: 'Solid',
  subcategory: 'Surface',

  metadata: {
    label: 'RuledSurface',
    description: 'Create a ruled surface between two curves',
    
    
  },

  params: {
    
  },

  inputs: {
        curve1: 'Wire',
    curve2: 'Wire'
  },

  outputs: {
        surface: 'Face'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makeRuledSurface',
      params: {
        curve1: inputs.curve1,
        curve2: inputs.curve2
        
      }
    });

    return {
      surface: result
    };
  }
};
