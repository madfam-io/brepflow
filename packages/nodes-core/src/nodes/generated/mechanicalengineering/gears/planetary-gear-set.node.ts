
import { NodeDefinition } from '@brepflow/types';

interface Params {
  sunTeeth: number;
  planetTeeth: number;
  planetCount: number;
  module: number;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  assembly: Shape;
  sunGear: Shape;
  planetGears: Shape[];
  ringGear: Shape;
}

export const PlanetaryGearSetNode: NodeDefinition<PlanetaryGearSetInputs, PlanetaryGearSetOutputs, PlanetaryGearSetParams> = {
  type: 'MechanicalEngineering::PlanetaryGearSet',
  category: 'MechanicalEngineering',
  subcategory: 'Gears',

  metadata: {
    label: 'PlanetaryGearSet',
    description: 'Create planetary gear system',
    
    
  },

  params: {
        sunTeeth: {
      "default": 20,
      "min": 12,
      "max": 40
    },
    planetTeeth: {
      "default": 16,
      "min": 8,
      "max": 30
    },
    planetCount: {
      "default": 3,
      "min": 2,
      "max": 6
    },
    module: {
      "default": 2,
      "min": 0.5,
      "max": 5
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        assembly: 'Shape',
    sunGear: 'Shape',
    planetGears: 'Shape[]',
    ringGear: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'planetaryGears',
      params: {
        center: inputs.center,
        sunTeeth: params.sunTeeth,
        planetTeeth: params.planetTeeth,
        planetCount: params.planetCount,
        module: params.module
      }
    });

    return {
      assembly: result,
      sunGear: result,
      planetGears: result,
      ringGear: result
    };
  }
};
