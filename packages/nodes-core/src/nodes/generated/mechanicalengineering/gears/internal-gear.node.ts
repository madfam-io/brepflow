
import { NodeDefinition } from '@brepflow/types';

interface Params {
  module: number;
  teeth: number;
  rimThickness: number;
  width: number;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  gear: Shape;
  innerProfile: Wire;
}

export const InternalGearNode: NodeDefinition<InternalGearInputs, InternalGearOutputs, InternalGearParams> = {
  type: 'MechanicalEngineering::InternalGear',
  category: 'MechanicalEngineering',
  subcategory: 'Gears',

  metadata: {
    label: 'InternalGear',
    description: 'Create internal/ring gear',
    
    
  },

  params: {
        module: {
      "default": 2,
      "min": 0.5,
      "max": 10
    },
    teeth: {
      "default": 60,
      "min": 30,
      "max": 200
    },
    rimThickness: {
      "default": 10,
      "min": 5,
      "max": 30
    },
    width: {
      "default": 20,
      "min": 5,
      "max": 50
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        gear: 'Shape',
    innerProfile: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'internalGear',
      params: {
        center: inputs.center,
        module: params.module,
        teeth: params.teeth,
        rimThickness: params.rimThickness,
        width: params.width
      }
    });

    return {
      gear: result,
      innerProfile: result
    };
  }
};
