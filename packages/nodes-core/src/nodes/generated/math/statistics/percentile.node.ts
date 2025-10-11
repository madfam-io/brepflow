import type { NodeDefinition } from '@brepflow/types';

interface PercentileParams {
  percentile: number;
}

interface PercentileInputs {
  values: unknown;
}

interface PercentileOutputs {
  result: unknown;
}

export const PercentileNode: NodeDefinition<PercentileInputs, PercentileOutputs, PercentileParams> = {
  id: 'Math::Percentile',
  category: 'Math',
  label: 'Percentile',
  description: 'Calculate percentile',
  inputs: {
    values: {
      type: 'number[]',
      label: 'Values',
      required: true
    }
  },
  outputs: {
    result: {
      type: 'number',
      label: 'Result'
    }
  },
  params: {
    percentile: {
      type: 'number',
      label: 'Percentile',
      default: 50,
      min: 0,
      max: 100
    }
  },
  async evaluate(context, inputs, params) {
    const result = await context.geometry.execute({
      type: 'mathPercentile',
      params: {
        values: inputs.values,
        percentile: params.percentile
      }
    });
    
    return {
      result: result
    };
  },
};
