
import { NodeDefinition } from '@brepflow/types';

interface Params {
  wireDiameter: number;
  coilDiameter: number;
  coils: number;
  legLength: number;
  legAngle: number;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  spring: Shape;
  legs: Wire[];
}

export const TorsionSpringNode: NodeDefinition<TorsionSpringInputs, TorsionSpringOutputs, TorsionSpringParams> = {
  type: 'MechanicalEngineering::TorsionSpring',
  category: 'MechanicalEngineering',
  subcategory: 'Springs',

  metadata: {
    label: 'TorsionSpring',
    description: 'Create torsion spring',
    
    
  },

  params: {
        wireDiameter: {
      "default": 2,
      "min": 0.5,
      "max": 8
    },
    coilDiameter: {
      "default": 20,
      "min": 5,
      "max": 80
    },
    coils: {
      "default": 5,
      "min": 2,
      "max": 20
    },
    legLength: {
      "default": 30,
      "min": 10,
      "max": 100
    },
    legAngle: {
      "default": 90,
      "min": 0,
      "max": 180
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        spring: 'Shape',
    legs: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'torsionSpring',
      params: {
        center: inputs.center,
        wireDiameter: params.wireDiameter,
        coilDiameter: params.coilDiameter,
        coils: params.coils,
        legLength: params.legLength,
        legAngle: params.legAngle
      }
    });

    return {
      spring: result,
      legs: result
    };
  }
};
