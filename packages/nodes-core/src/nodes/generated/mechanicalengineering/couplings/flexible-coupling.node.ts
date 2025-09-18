
import { NodeDefinition } from '@brepflow/types';

interface Params {
  type: string;
  boreDiameter1: number;
  boreDiameter2: number;
  outerDiameter: number;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  coupling: Shape;
  element: Shape;
}

export const FlexibleCouplingNode: NodeDefinition<FlexibleCouplingInputs, FlexibleCouplingOutputs, FlexibleCouplingParams> = {
  type: 'MechanicalEngineering::FlexibleCoupling',
  category: 'MechanicalEngineering',
  subcategory: 'Couplings',

  metadata: {
    label: 'FlexibleCoupling',
    description: 'Create flexible coupling',
    
    
  },

  params: {
        type: {
      "default": "jaw",
      "options": [
        "jaw",
        "disc",
        "beam",
        "oldham"
      ]
    },
    boreDiameter1: {
      "default": 10,
      "min": 3,
      "max": 50
    },
    boreDiameter2: {
      "default": 10,
      "min": 3,
      "max": 50
    },
    outerDiameter: {
      "default": 30,
      "min": 10,
      "max": 100
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        coupling: 'Shape',
    element: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'flexibleCoupling',
      params: {
        center: inputs.center,
        type: params.type,
        boreDiameter1: params.boreDiameter1,
        boreDiameter2: params.boreDiameter2,
        outerDiameter: params.outerDiameter
      }
    });

    return {
      coupling: result,
      element: result
    };
  }
};
