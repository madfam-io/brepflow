import type { NodeDefinition } from '@brepflow/types';

type ToBooleanParams = Record<string, never>;

interface ToBooleanInputs {
  data: unknown;
}

interface ToBooleanOutputs {
  boolean: unknown;
}

export const ToBooleanNode: NodeDefinition<ToBooleanInputs, ToBooleanOutputs, ToBooleanParams> = {
  id: 'Data::ToBoolean',
  category: 'Data',
  label: 'ToBoolean',
  description: 'Convert to boolean',
  inputs: {
    data: {
      type: 'Data',
      label: 'Data',
      required: true
    }
  },
  outputs: {
    boolean: {
      type: 'boolean',
      label: 'Boolean'
    }
  },
  params: {},
  async evaluate(context, inputs, params) {
    const result = await context.geometry.execute({
      type: 'convertToBoolean',
      params: {
        data: inputs.data
      }
    });
    
    return {
      boolean: result
    };
  },
};
