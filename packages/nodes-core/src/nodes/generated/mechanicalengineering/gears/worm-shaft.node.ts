
import { NodeDefinition } from '@brepflow/types';

interface Params {
  module: number;
  starts: number;
  length: number;
  leadAngle: number;
}
interface Inputs {
  axis: Wire;
}
interface Outputs {
  worm: Shape;
  helix: Wire;
}

export const WormShaftNode: NodeDefinition<WormShaftInputs, WormShaftOutputs, WormShaftParams> = {
  type: 'MechanicalEngineering::WormShaft',
  category: 'MechanicalEngineering',
  subcategory: 'Gears',

  metadata: {
    label: 'WormShaft',
    description: 'Create worm shaft for worm gear',
    
    
  },

  params: {
        module: {
      "default": 2,
      "min": 0.5,
      "max": 10
    },
    starts: {
      "default": 1,
      "min": 1,
      "max": 4,
      "description": "Number of starts"
    },
    length: {
      "default": 50,
      "min": 20,
      "max": 200
    },
    leadAngle: {
      "default": 5,
      "min": 1,
      "max": 30
    }
  },

  inputs: {
        axis: 'Wire'
  },

  outputs: {
        worm: 'Shape',
    helix: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'wormShaft',
      params: {
        axis: inputs.axis,
        module: params.module,
        starts: params.starts,
        length: params.length,
        leadAngle: params.leadAngle
      }
    });

    return {
      worm: result,
      helix: result
    };
  }
};
