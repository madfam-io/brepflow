import type { NodeDefinition } from '@brepflow/types';

type FactorialParams = Record<string, never>;

interface FactorialInputs {
  n: unknown;
}

interface FactorialOutputs {
  result: unknown;
}

export const FactorialNode: NodeDefinition<FactorialInputs, FactorialOutputs, FactorialParams> = {
  id: 'Math::Factorial',
  category: 'Math',
  label: 'Factorial',
  description: 'Factorial',
  inputs: {
    n: {
      type: 'number',
      label: 'N',
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
      type: 'mathFactorial',
      params: {
        n: inputs.n
      }
    });
    
    return {
      result: result
    };
  },
};
