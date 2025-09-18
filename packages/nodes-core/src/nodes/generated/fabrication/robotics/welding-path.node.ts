
import { NodeDefinition } from '@brepflow/types';

interface Params {
  weldType: string;
  weavePattern: string;
  travelSpeed: number;
}
interface Inputs {
  seamPath: Wire;
}
interface Outputs {
  weldPath: Transform[];
  weldParameters: Data;
}

export const WeldingPathNode: NodeDefinition<WeldingPathInputs, WeldingPathOutputs, WeldingPathParams> = {
  type: 'Fabrication::WeldingPath',
  category: 'Fabrication',
  subcategory: 'Robotics',

  metadata: {
    label: 'WeldingPath',
    description: 'Robotic welding path',
    
    
  },

  params: {
        weldType: {
      "default": "mig",
      "options": [
        "mig",
        "tig",
        "spot",
        "laser"
      ]
    },
    weavePattern: {
      "default": "none",
      "options": [
        "none",
        "zigzag",
        "circular",
        "triangular"
      ]
    },
    travelSpeed: {
      "default": 10,
      "min": 1,
      "max": 50
    }
  },

  inputs: {
        seamPath: 'Wire'
  },

  outputs: {
        weldPath: 'Transform[]',
    weldParameters: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'weldingPath',
      params: {
        seamPath: inputs.seamPath,
        weldType: params.weldType,
        weavePattern: params.weavePattern,
        travelSpeed: params.travelSpeed
      }
    });

    return {
      weldPath: result,
      weldParameters: result
    };
  }
};
