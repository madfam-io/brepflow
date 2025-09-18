
import { NodeDefinition } from '@brepflow/types';

interface Params {
  stepSize: number;
  maxSteps: number;
  direction: string;
}
interface Inputs {
  field: VectorField;
  seeds: Point[];
}
interface Outputs {
  lines: Wire[];
}

export const FieldLineNode: NodeDefinition<FieldLineInputs, FieldLineOutputs, FieldLineParams> = {
  type: 'Field::FieldLine',
  category: 'Field',
  subcategory: 'Sample',

  metadata: {
    label: 'FieldLine',
    description: 'Create field lines',
    
    
  },

  params: {
        stepSize: {
      "default": 1,
      "min": 0.01
    },
    maxSteps: {
      "default": 1000,
      "min": 10,
      "max": 10000,
      "step": 10
    },
    direction: {
      "default": "forward",
      "options": [
        "forward",
        "backward",
        "both"
      ]
    }
  },

  inputs: {
        field: 'VectorField',
    seeds: 'Point[]'
  },

  outputs: {
        lines: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fieldLine',
      params: {
        field: inputs.field,
        seeds: inputs.seeds,
        stepSize: params.stepSize,
        maxSteps: params.maxSteps,
        direction: params.direction
      }
    });

    return {
      lines: result
    };
  }
};
