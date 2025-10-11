import type { NodeDefinition } from '@brepflow/types';

type FieldInvertParams = Record<string, never>;

interface FieldInvertInputs {
  field: unknown;
}

interface FieldInvertOutputs {
  inverted: unknown;
}

export const FieldInvertNode: NodeDefinition<FieldInvertInputs, FieldInvertOutputs, FieldInvertParams> = {
  id: 'Field::FieldInvert',
  category: 'Field',
  label: 'FieldInvert',
  description: 'Invert field values',
  inputs: {
    field: {
      type: 'ScalarField',
      label: 'Field',
      required: true
    }
  },
  outputs: {
    inverted: {
      type: 'ScalarField',
      label: 'Inverted'
    }
  },
  params: {},
  async evaluate(context, inputs, params) {
    const result = await context.geometry.execute({
      type: 'fieldInvert',
      params: {
        field: inputs.field
      }
    });
    
    return {
      inverted: result
    };
  },
};
