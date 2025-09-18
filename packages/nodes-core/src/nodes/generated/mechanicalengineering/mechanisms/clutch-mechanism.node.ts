
import { NodeDefinition } from '@brepflow/types';

interface Params {
  type: string;
  outerDiameter: number;
  innerDiameter: number;
  plateCount: number;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  clutch: Shape;
  plates: Shape[];
}

export const ClutchMechanismNode: NodeDefinition<ClutchMechanismInputs, ClutchMechanismOutputs, ClutchMechanismParams> = {
  type: 'MechanicalEngineering::ClutchMechanism',
  category: 'MechanicalEngineering',
  subcategory: 'Mechanisms',

  metadata: {
    label: 'ClutchMechanism',
    description: 'Create clutch assembly',
    
    
  },

  params: {
        type: {
      "default": "friction",
      "options": [
        "friction",
        "dog",
        "centrifugal",
        "electromagnetic"
      ]
    },
    outerDiameter: {
      "default": 100,
      "min": 30,
      "max": 300
    },
    innerDiameter: {
      "default": 50,
      "min": 20,
      "max": 150
    },
    plateCount: {
      "default": 3,
      "min": 1,
      "max": 8
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        clutch: 'Shape',
    plates: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'clutchMechanism',
      params: {
        center: inputs.center,
        type: params.type,
        outerDiameter: params.outerDiameter,
        innerDiameter: params.innerDiameter,
        plateCount: params.plateCount
      }
    });

    return {
      clutch: result,
      plates: result
    };
  }
};
