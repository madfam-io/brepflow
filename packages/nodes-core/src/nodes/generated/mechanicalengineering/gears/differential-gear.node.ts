
import { NodeDefinition } from '@brepflow/types';

interface Params {
  ringGearTeeth: number;
  pinionTeeth: number;
  spiderGearTeeth: number;
  module: number;
}
interface Inputs {
  housingCenter: Point;
}
interface Outputs {
  assembly: Shape;
  housing: Shape;
  gears: Shape[];
}

export const DifferentialGearNode: NodeDefinition<DifferentialGearInputs, DifferentialGearOutputs, DifferentialGearParams> = {
  type: 'MechanicalEngineering::DifferentialGear',
  category: 'MechanicalEngineering',
  subcategory: 'Gears',

  metadata: {
    label: 'DifferentialGear',
    description: 'Create differential gear assembly',
    
    
  },

  params: {
        ringGearTeeth: {
      "default": 41,
      "min": 30,
      "max": 60
    },
    pinionTeeth: {
      "default": 13,
      "min": 9,
      "max": 17
    },
    spiderGearTeeth: {
      "default": 10,
      "min": 8,
      "max": 14
    },
    module: {
      "default": 3,
      "min": 2,
      "max": 5
    }
  },

  inputs: {
        housingCenter: 'Point'
  },

  outputs: {
        assembly: 'Shape',
    housing: 'Shape',
    gears: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'differentialGear',
      params: {
        housingCenter: inputs.housingCenter,
        ringGearTeeth: params.ringGearTeeth,
        pinionTeeth: params.pinionTeeth,
        spiderGearTeeth: params.spiderGearTeeth,
        module: params.module
      }
    });

    return {
      assembly: result,
      housing: result,
      gears: result
    };
  }
};
