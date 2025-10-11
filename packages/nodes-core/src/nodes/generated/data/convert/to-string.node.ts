import type { NodeDefinition } from '@brepflow/types';

type ToStringParams = Record<string, never>;

interface ToStringInputs {
  data: unknown;
}

interface ToStringOutputs {
  string: unknown;
}

export const ToStringNode: NodeDefinition<ToStringInputs, ToStringOutputs, ToStringParams> = {
  id: 'Data::ToString',
  category: 'Data',
  label: 'ToString',
  description: 'Convert to string',
  inputs: {
    data: {
      type: 'Data',
      label: 'Data',
      required: true
    }
  },
  outputs: {
    string: {
      type: 'string',
      label: 'String'
    }
  },
  params: {},
  async evaluate(context, inputs, params) {
    const result = await context.geometry.execute({
      type: 'convertToString',
      params: {
        data: inputs.data
      }
    });
    
    return {
      string: result
    };
  },
};
