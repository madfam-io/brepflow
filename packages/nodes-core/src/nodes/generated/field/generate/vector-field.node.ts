
import { NodeDefinition } from '@brepflow/types';

interface Params {
  expressionX: string;
  expressionY: string;
  expressionZ: string;
}
interface Inputs {
  domain: Box;
}
interface Outputs {
  field: VectorField;
}

export const VectorFieldNode: NodeDefinition<VectorFieldInputs, VectorFieldOutputs, VectorFieldParams> = {
  type: 'Field::VectorField',
  category: 'Field',
  subcategory: 'Generate',

  metadata: {
    label: 'VectorField',
    description: 'Vector field from expression',
    
    
  },

  params: {
        expressionX: {
      "default": "y"
    },
    expressionY: {
      "default": "-x"
    },
    expressionZ: {
      "default": "0"
    }
  },

  inputs: {
        domain: 'Box'
  },

  outputs: {
        field: 'VectorField'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fieldVector',
      params: {
        domain: inputs.domain,
        expressionX: params.expressionX,
        expressionY: params.expressionY,
        expressionZ: params.expressionZ
      }
    });

    return {
      field: result
    };
  }
};
