import type { NodeDefinition } from '@brepflow/types';

type SquareRootParams = Record<string, never>;

interface SquareRootInputs {
  value: unknown;
}

interface SquareRootOutputs {
  result: unknown;
}

export const SquareRootNode: NodeDefinition<SquareRootInputs, SquareRootOutputs, SquareRootParams> = {
  id: 'Math::SquareRoot',
  category: 'Math',
  label: 'SquareRoot',
  description: 'Square root',
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
      type: 'mathSqrt',
      params: {
        value: inputs.value
      }
    });
    
    return {
      result: result
    };
  },
};
