
import { NodeDefinition } from '@brepflow/types';

interface Params {
  majorDiameter: number;
  minorDiameter: number;
  splineCount: number;
  length: number;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  shaft: Shape;
  splines: Wire[];
}

export const SplinedShaftNode: NodeDefinition<SplinedShaftInputs, SplinedShaftOutputs, SplinedShaftParams> = {
  type: 'MechanicalEngineering::SplinedShaft',
  category: 'MechanicalEngineering',
  subcategory: 'Shafts',

  metadata: {
    label: 'SplinedShaft',
    description: 'Create splined shaft',
    
    
  },

  params: {
        majorDiameter: {
      "default": 25,
      "min": 10,
      "max": 100
    },
    minorDiameter: {
      "default": 22,
      "min": 8,
      "max": 95
    },
    splineCount: {
      "default": 6,
      "min": 4,
      "max": 20
    },
    length: {
      "default": 50,
      "min": 10,
      "max": 200
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        shaft: 'Shape',
    splines: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'splinedShaft',
      params: {
        center: inputs.center,
        majorDiameter: params.majorDiameter,
        minorDiameter: params.minorDiameter,
        splineCount: params.splineCount,
        length: params.length
      }
    });

    return {
      shaft: result,
      splines: result
    };
  }
};
