
import { NodeDefinition } from '@brepflow/types';

interface Params {
  module: number;
  teeth: number;
  diameter: number;
  width: number;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  gear: Shape;
  throat: Wire;
}

export const WormGearNode: NodeDefinition<WormGearInputs, WormGearOutputs, WormGearParams> = {
  type: 'MechanicalEngineering::WormGear',
  category: 'MechanicalEngineering',
  subcategory: 'Gears',

  metadata: {
    label: 'WormGear',
    description: 'Create worm gear for high reduction',
    
    
  },

  params: {
        module: {
      "default": 2,
      "min": 0.5,
      "max": 10
    },
    teeth: {
      "default": 30,
      "min": 20,
      "max": 100
    },
    diameter: {
      "default": 60,
      "min": 20,
      "max": 200
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
    throat: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'wormGear',
      params: {
        center: inputs.center,
        module: params.module,
        teeth: params.teeth,
        diameter: params.diameter,
        width: params.width
      }
    });

    return {
      gear: result,
      throat: result
    };
  }
};
