
import { NodeDefinition } from '@brepflow/types';

interface Params {
  module: number;
  teeth: number;
  coneAngle: number;
  faceWidth: number;
}
interface Inputs {
  apex: Point;
}
interface Outputs {
  gear: Shape;
  pitchCone: Surface;
}

export const BevelGearNode: NodeDefinition<BevelGearInputs, BevelGearOutputs, BevelGearParams> = {
  type: 'MechanicalEngineering::BevelGear',
  category: 'MechanicalEngineering',
  subcategory: 'Gears',

  metadata: {
    label: 'BevelGear',
    description: 'Create bevel gear for angle transmission',
    
    
  },

  params: {
        module: {
      "default": 3,
      "min": 1,
      "max": 20
    },
    teeth: {
      "default": 25,
      "min": 10,
      "max": 100
    },
    coneAngle: {
      "default": 45,
      "min": 10,
      "max": 80,
      "description": "Pitch cone angle"
    },
    faceWidth: {
      "default": 15,
      "min": 5,
      "max": 50
    }
  },

  inputs: {
        apex: 'Point'
  },

  outputs: {
        gear: 'Shape',
    pitchCone: 'Surface'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'bevelGear',
      params: {
        apex: inputs.apex,
        module: params.module,
        teeth: params.teeth,
        coneAngle: params.coneAngle,
        faceWidth: params.faceWidth
      }
    });

    return {
      gear: result,
      pitchCone: result
    };
  }
};
