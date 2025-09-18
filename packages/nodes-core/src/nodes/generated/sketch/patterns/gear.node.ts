
import { NodeDefinition } from '@brepflow/types';

interface Params {
  teeth: number;
  module: number;
  pressureAngle: number;
  addendum: number;
  dedendum: number;
}
interface Inputs {
  center?: Point;
}
interface Outputs {
  gear: Wire;
}

export const GearNode: NodeDefinition<GearInputs, GearOutputs, GearParams> = {
  type: 'Sketch::Gear',
  category: 'Sketch',
  subcategory: 'Patterns',

  metadata: {
    label: 'Gear',
    description: 'Create a gear profile',
    
    
  },

  params: {
        teeth: {
      "default": 20,
      "min": 3,
      "max": 200,
      "step": 1
    },
    module: {
      "default": 2,
      "min": 0.1,
      "max": 100
    },
    pressureAngle: {
      "default": 20,
      "min": 14.5,
      "max": 30
    },
    addendum: {
      "default": 1,
      "min": 0.5,
      "max": 1.5
    },
    dedendum: {
      "default": 1.25,
      "min": 1,
      "max": 2
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        gear: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makeGear',
      params: {
        center: inputs.center,
        teeth: params.teeth,
        module: params.module,
        pressureAngle: params.pressureAngle,
        addendum: params.addendum,
        dedendum: params.dedendum
      }
    });

    return {
      gear: result
    };
  }
};
