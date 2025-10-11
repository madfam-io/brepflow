import type { NodeDefinition } from '@brepflow/types';

interface SineFieldParams {
  frequency: [number, number, number];
  amplitude: number;
  phase: [number, number, number];
}

interface SineFieldInputs {
  domain: unknown;
}

interface SineFieldOutputs {
  field: unknown;
}

export const SineFieldNode: NodeDefinition<SineFieldInputs, SineFieldOutputs, SineFieldParams> = {
  id: 'Field::SineField',
  category: 'Field',
  label: 'SineField',
  description: 'Sinusoidal wave field',
  inputs: {
    domain: {
      type: 'Box',
      label: 'Domain',
      required: true
    }
  },
  outputs: {
    field: {
      type: 'ScalarField',
      label: 'Field'
    }
  },
  params: {
    frequency: {
      type: 'vec3',
      label: 'Frequency',
      default: [0.1,0.1,0.1]
    },
    amplitude: {
      type: 'number',
      label: 'Amplitude',
      default: 1,
      min: 0
    },
    phase: {
      type: 'vec3',
      label: 'Phase',
      default: [0,0,0]
    }
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
  },
};
