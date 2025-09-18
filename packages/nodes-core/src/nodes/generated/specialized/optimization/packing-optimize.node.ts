
import { NodeDefinition } from '@brepflow/types';

interface Params {
  containerSize: [number, number, number];
  rotationAllowed: boolean;
  algorithm: string;
}
interface Inputs {
  parts: Shape[];
}
interface Outputs {
  packing: Data;
  efficiency: number;
}

export const PackingOptimizeNode: NodeDefinition<PackingOptimizeInputs, PackingOptimizeOutputs, PackingOptimizeParams> = {
  type: 'Specialized::PackingOptimize',
  category: 'Specialized',
  subcategory: 'Optimization',

  metadata: {
    label: 'PackingOptimize',
    description: 'Optimize part packing',
    
    
  },

  params: {
        containerSize: {
      "default": [
        100,
        100,
        100
      ]
    },
    rotationAllowed: {
      "default": true
    },
    algorithm: {
      "default": "genetic",
      "options": [
        "greedy",
        "genetic",
        "simulated-annealing"
      ]
    }
  },

  inputs: {
        parts: 'Shape[]'
  },

  outputs: {
        packing: 'Data',
    efficiency: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'packingOptimize',
      params: {
        parts: inputs.parts,
        containerSize: params.containerSize,
        rotationAllowed: params.rotationAllowed,
        algorithm: params.algorithm
      }
    });

    return {
      packing: result,
      efficiency: result
    };
  }
};
