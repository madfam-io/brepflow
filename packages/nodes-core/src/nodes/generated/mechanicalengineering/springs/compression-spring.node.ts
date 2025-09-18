
import { NodeDefinition } from '@brepflow/types';

interface Params {
  wireDiameter: number;
  coilDiameter: number;
  freeLength: number;
  coils: number;
  endType: string;
}
interface Inputs {
  center: Point;
  axis?: Vector;
}
interface Outputs {
  spring: Shape;
  helix: Wire;
}

export const CompressionSpringNode: NodeDefinition<CompressionSpringInputs, CompressionSpringOutputs, CompressionSpringParams> = {
  type: 'MechanicalEngineering::CompressionSpring',
  category: 'MechanicalEngineering',
  subcategory: 'Springs',

  metadata: {
    label: 'CompressionSpring',
    description: 'Create compression coil spring',
    
    
  },

  params: {
        wireDiameter: {
      "default": 2,
      "min": 0.5,
      "max": 10
    },
    coilDiameter: {
      "default": 20,
      "min": 5,
      "max": 100
    },
    freeLength: {
      "default": 50,
      "min": 10,
      "max": 200
    },
    coils: {
      "default": 8,
      "min": 3,
      "max": 30
    },
    endType: {
      "default": "closed",
      "options": [
        "closed",
        "open",
        "ground"
      ]
    }
  },

  inputs: {
        center: 'Point',
    axis: 'Vector'
  },

  outputs: {
        spring: 'Shape',
    helix: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'compressionSpring',
      params: {
        center: inputs.center,
        axis: inputs.axis,
        wireDiameter: params.wireDiameter,
        coilDiameter: params.coilDiameter,
        freeLength: params.freeLength,
        coils: params.coils,
        endType: params.endType
      }
    });

    return {
      spring: result,
      helix: result
    };
  }
};
