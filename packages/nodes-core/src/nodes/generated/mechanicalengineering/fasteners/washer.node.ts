
import { NodeDefinition } from '@brepflow/types';

interface Params {
  innerDiameter: number;
  outerDiameter: number;
  thickness: number;
  type: string;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  washer: Shape;
}

export const WasherNode: NodeDefinition<WasherInputs, WasherOutputs, WasherParams> = {
  type: 'MechanicalEngineering::Washer',
  category: 'MechanicalEngineering',
  subcategory: 'Fasteners',

  metadata: {
    label: 'Washer',
    description: 'Create washer',
    
    
  },

  params: {
        innerDiameter: {
      "default": 6.4,
      "min": 2,
      "max": 50
    },
    outerDiameter: {
      "default": 12,
      "min": 4,
      "max": 100
    },
    thickness: {
      "default": 1.6,
      "min": 0.5,
      "max": 5
    },
    type: {
      "default": "flat",
      "options": [
        "flat",
        "spring",
        "lock",
        "fender"
      ]
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        washer: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'washer',
      params: {
        center: inputs.center,
        innerDiameter: params.innerDiameter,
        outerDiameter: params.outerDiameter,
        thickness: params.thickness,
        type: params.type
      }
    });

    return {
      washer: result
    };
  }
};
