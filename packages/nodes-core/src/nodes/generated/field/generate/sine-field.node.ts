
import { NodeDefinition } from '@brepflow/types';

interface Params {
  frequency: [number, number, number];
  amplitude: number;
  phase: [number, number, number];
}
interface Inputs {
  domain: Box;
}
interface Outputs {
  field: ScalarField;
}

export const SineFieldNode: NodeDefinition<SineFieldInputs, SineFieldOutputs, SineFieldParams> = {
  type: 'Field::SineField',
  category: 'Field',
  subcategory: 'Generate',

  metadata: {
    label: 'SineField',
    description: 'Sinusoidal wave field',
    
    
  },

  params: {
        frequency: {
      "default": [
        0.1,
        0.1,
        0.1
      ]
    },
    amplitude: {
      "default": 1,
      "min": 0
    },
    phase: {
      "default": [
        0,
        0,
        0
      ]
    }
  },

  inputs: {
        domain: 'Box'
  },

  outputs: {
        field: 'ScalarField'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fieldSine',
      params: {
        domain: inputs.domain,
        frequency: params.frequency,
        amplitude: params.amplitude,
        phase: params.phase
      }
    });

    return {
      field: result
    };
  }
};
