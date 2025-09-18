
import { NodeDefinition } from '@brepflow/types';

interface Params {
  method: string;
  amount: number;
}
interface Inputs {
  shape: Shape;
  controlPoints?: Point[];
}
interface Outputs {
  deformed: Shape;
}

export const DeformNode: NodeDefinition<DeformInputs, DeformOutputs, DeformParams> = {
  type: 'Transform::Deform',
  category: 'Transform',
  

  metadata: {
    label: 'Deform',
    description: 'Deform shape with control points',
    
    
  },

  params: {
        method: {
      "default": "bend",
      "options": [
        "bend",
        "twist",
        "taper",
        "stretch"
      ]
    },
    amount: {
      "default": 1,
      "min": -10,
      "max": 10
    }
  },

  inputs: {
        shape: 'Shape',
    controlPoints: 'Point[]'
  },

  outputs: {
        deformed: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'transformDeform',
      params: {
        shape: inputs.shape,
        controlPoints: inputs.controlPoints,
        method: params.method,
        amount: params.amount
      }
    });

    return {
      deformed: result
    };
  }
};
