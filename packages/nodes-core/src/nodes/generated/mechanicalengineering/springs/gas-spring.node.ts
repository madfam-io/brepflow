
import { NodeDefinition } from '@brepflow/types';

interface Params {
  cylinderDiameter: number;
  strokeLength: number;
  extendedLength: number;
  rodDiameter: number;
}
interface Inputs {
  mountPoint: Point;
}
interface Outputs {
  gasSpring: Shape;
  cylinder: Shape;
  rod: Shape;
}

export const GasSpringNode: NodeDefinition<GasSpringInputs, GasSpringOutputs, GasSpringParams> = {
  type: 'MechanicalEngineering::GasSpring',
  category: 'MechanicalEngineering',
  subcategory: 'Springs',

  metadata: {
    label: 'GasSpring',
    description: 'Create gas spring/damper',
    
    
  },

  params: {
        cylinderDiameter: {
      "default": 20,
      "min": 10,
      "max": 50
    },
    strokeLength: {
      "default": 100,
      "min": 30,
      "max": 300
    },
    extendedLength: {
      "default": 250,
      "min": 100,
      "max": 600
    },
    rodDiameter: {
      "default": 8,
      "min": 4,
      "max": 20
    }
  },

  inputs: {
        mountPoint: 'Point'
  },

  outputs: {
        gasSpring: 'Shape',
    cylinder: 'Shape',
    rod: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'gasSpring',
      params: {
        mountPoint: inputs.mountPoint,
        cylinderDiameter: params.cylinderDiameter,
        strokeLength: params.strokeLength,
        extendedLength: params.extendedLength,
        rodDiameter: params.rodDiameter
      }
    });

    return {
      gasSpring: result,
      cylinder: result,
      rod: result
    };
  }
};
