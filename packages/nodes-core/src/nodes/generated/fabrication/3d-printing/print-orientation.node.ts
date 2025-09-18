
import { NodeDefinition } from '@brepflow/types';

interface Params {
  optimize: string;
  constraints: boolean;
}
interface Inputs {
  model: Shape;
}
interface Outputs {
  orientation: Transform;
  orientedModel: Shape;
}

export const PrintOrientationNode: NodeDefinition<PrintOrientationInputs, PrintOrientationOutputs, PrintOrientationParams> = {
  type: 'Fabrication::PrintOrientation',
  category: 'Fabrication',
  subcategory: '3D Printing',

  metadata: {
    label: 'PrintOrientation',
    description: 'Optimize print orientation',
    
    
  },

  params: {
        optimize: {
      "default": "support",
      "options": [
        "support",
        "strength",
        "time",
        "quality"
      ]
    },
    constraints: {
      "default": false
    }
  },

  inputs: {
        model: 'Shape'
  },

  outputs: {
        orientation: 'Transform',
    orientedModel: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'printOrientation',
      params: {
        model: inputs.model,
        optimize: params.optimize,
        constraints: params.constraints
      }
    });

    return {
      orientation: result,
      orientedModel: result
    };
  }
};
