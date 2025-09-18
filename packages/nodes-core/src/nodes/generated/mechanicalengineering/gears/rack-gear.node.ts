
import { NodeDefinition } from '@brepflow/types';

interface Params {
  module: number;
  length: number;
  width: number;
  height: number;
}
interface Inputs {
  path: Wire;
}
interface Outputs {
  rack: Shape;
  pitchLine: Wire;
}

export const RackGearNode: NodeDefinition<RackGearInputs, RackGearOutputs, RackGearParams> = {
  type: 'MechanicalEngineering::RackGear',
  category: 'MechanicalEngineering',
  subcategory: 'Gears',

  metadata: {
    label: 'RackGear',
    description: 'Create linear rack gear',
    
    
  },

  params: {
        module: {
      "default": 2,
      "min": 0.5,
      "max": 10
    },
    length: {
      "default": 100,
      "min": 20,
      "max": 500
    },
    width: {
      "default": 20,
      "min": 5,
      "max": 50
    },
    height: {
      "default": 15,
      "min": 5,
      "max": 30
    }
  },

  inputs: {
        path: 'Wire'
  },

  outputs: {
        rack: 'Shape',
    pitchLine: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'rackGear',
      params: {
        path: inputs.path,
        module: params.module,
        length: params.length,
        width: params.width,
        height: params.height
      }
    });

    return {
      rack: result,
      pitchLine: result
    };
  }
};
