import type { NodeDefinition } from '@brepflow/types';

type ComplexMagnitudeParams = Record<string, never>;

interface ComplexMagnitudeInputs {
  complex: unknown;
}

interface ComplexMagnitudeOutputs {
  magnitude: unknown;
}

export const ComplexMagnitudeNode: NodeDefinition<ComplexMagnitudeInputs, ComplexMagnitudeOutputs, ComplexMagnitudeParams> = {
  id: 'Math::ComplexMagnitude',
  category: 'Math',
  label: 'ComplexMagnitude',
  description: 'Complex magnitude',
  inputs: {
    complex: {
      type: 'Complex',
      label: 'Complex',
      required: true
    }
  },
  outputs: {
    magnitude: {
      type: 'number',
      label: 'Magnitude'
    }
  },
  params: {},
  async evaluate(context, inputs, params) {
    const result = await context.geometry.execute({
      type: 'mathComplexMagnitude',
      params: {
        complex: inputs.complex
      }
    });
    
    return {
      magnitude: result
    };
  },
};
