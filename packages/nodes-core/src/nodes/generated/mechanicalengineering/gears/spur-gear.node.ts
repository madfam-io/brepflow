
import { NodeDefinition } from '@brepflow/types';

interface Params {
  module: number;
  teeth: number;
  pressureAngle: number;
  width: number;
  hubDiameter: number;
}
interface Inputs {
  center?: Point;
  axis?: Vector;
}
interface Outputs {
  gear: Shape;
  pitchCircle: Wire;
  properties: Properties;
}

export const SpurGearNode: NodeDefinition<SpurGearInputs, SpurGearOutputs, SpurGearParams> = {
  type: 'MechanicalEngineering::SpurGear',
  category: 'MechanicalEngineering',
  subcategory: 'Gears',

  metadata: {
    label: 'SpurGear',
    description: 'Create standard spur gear',
    
    
  },

  params: {
        module: {
      "default": 2,
      "min": 0.5,
      "max": 20,
      "step": 0.1,
      "description": "Gear module in mm"
    },
    teeth: {
      "default": 20,
      "min": 6,
      "max": 200,
      "description": "Number of teeth"
    },
    pressureAngle: {
      "default": 20,
      "min": 14.5,
      "max": 25,
      "description": "Pressure angle in degrees"
    },
    width: {
      "default": 20,
      "min": 1,
      "max": 200,
      "description": "Face width in mm"
    },
    hubDiameter: {
      "default": 20,
      "min": 5,
      "max": 100,
      "description": "Hub bore diameter"
    }
  },

  inputs: {
        center: 'Point',
    axis: 'Vector'
  },

  outputs: {
        gear: 'Shape',
    pitchCircle: 'Wire',
    properties: 'Properties'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'spurGear',
      params: {
        center: inputs.center,
        axis: inputs.axis,
        module: params.module,
        teeth: params.teeth,
        pressureAngle: params.pressureAngle,
        width: params.width,
        hubDiameter: params.hubDiameter
      }
    });

    return {
      gear: result,
      pitchCircle: result,
      properties: result
    };
  }
};
