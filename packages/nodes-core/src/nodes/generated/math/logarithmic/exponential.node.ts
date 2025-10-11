import type { NodeDefinition } from '@brepflow/types';

type ExponentialParams = Record<string, never>;

interface ExponentialInputs {
  value: unknown;
}

interface ExponentialOutputs {
  result: unknown;
}

export const ExponentialNode: NodeDefinition<ExponentialInputs, ExponentialOutputs, ExponentialParams> = {
  id: 'Math::Exponential',
  category: 'Math',
  label: 'Exponential',
  description: 'Exponential function',
  inputs: {
    value: {
      type: 'number',
      label: 'Value',
      required: true
    }
  },
  outputs: {
    result: {
      type: 'number',
      label: 'Result'
    }
  },
  params: {},
  async evaluate(context, inputs, params) {
    const result = await context.geometry.execute({
      type: 'mathExp',
      params: {
        value: inputs.value
      }
    });
    
    return {
      result: result
    };
  },
};
