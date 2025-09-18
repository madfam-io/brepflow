
import { NodeDefinition } from '@brepflow/types';

interface Params {
  shaftDiameter: number;
  outerDiameter: number;
  width: number;
  clampType: string;
}
interface Inputs {
  position: Point;
}
interface Outputs {
  collar: Shape;
  bore: Wire;
}

export const ClampingCollarNode: NodeDefinition<ClampingCollarInputs, ClampingCollarOutputs, ClampingCollarParams> = {
  type: 'MechanicalEngineering::ClampingCollar',
  category: 'MechanicalEngineering',
  subcategory: 'Fasteners',

  metadata: {
    label: 'ClampingCollar',
    description: 'Create shaft collar/clamp',
    
    
  },

  params: {
        shaftDiameter: {
      "default": 10,
      "min": 3,
      "max": 50
    },
    outerDiameter: {
      "default": 20,
      "min": 8,
      "max": 80
    },
    width: {
      "default": 8,
      "min": 3,
      "max": 20
    },
    clampType: {
      "default": "set-screw",
      "options": [
        "set-screw",
        "split",
        "hinged"
      ]
    }
  },

  inputs: {
        position: 'Point'
  },

  outputs: {
        collar: 'Shape',
    bore: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'clampingCollar',
      params: {
        position: inputs.position,
        shaftDiameter: params.shaftDiameter,
        outerDiameter: params.outerDiameter,
        width: params.width,
        clampType: params.clampType
      }
    });

    return {
      collar: result,
      bore: result
    };
  }
};
