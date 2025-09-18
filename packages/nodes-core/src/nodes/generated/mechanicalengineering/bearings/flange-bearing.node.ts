
import { NodeDefinition } from '@brepflow/types';

interface Params {
  boreDiameter: number;
  flangeDiameter: number;
  thickness: number;
  mountingHoles: number;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  bearing: Shape;
  flange: Face;
  holes: Wire[];
}

export const FlangeBearingNode: NodeDefinition<FlangeBearingInputs, FlangeBearingOutputs, FlangeBearingParams> = {
  type: 'MechanicalEngineering::FlangeBearing',
  category: 'MechanicalEngineering',
  subcategory: 'Bearings',

  metadata: {
    label: 'FlangeBearing',
    description: 'Create flanged bearing unit',
    
    
  },

  params: {
        boreDiameter: {
      "default": 12,
      "min": 5,
      "max": 80
    },
    flangeDiameter: {
      "default": 40,
      "min": 20,
      "max": 150
    },
    thickness: {
      "default": 8,
      "min": 3,
      "max": 30
    },
    mountingHoles: {
      "default": 4,
      "min": 3,
      "max": 8
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        bearing: 'Shape',
    flange: 'Face',
    holes: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'flangeBearing',
      params: {
        center: inputs.center,
        boreDiameter: params.boreDiameter,
        flangeDiameter: params.flangeDiameter,
        thickness: params.thickness,
        mountingHoles: params.mountingHoles
      }
    });

    return {
      bearing: result,
      flange: result,
      holes: result
    };
  }
};
