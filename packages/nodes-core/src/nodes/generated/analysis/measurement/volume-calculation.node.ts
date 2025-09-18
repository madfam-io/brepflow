
import { NodeDefinition } from '@brepflow/types';

interface Params {
  precision: number;
  density: number;
}
interface Inputs {
  solid: Shape;
}
interface Outputs {
  volume: number;
  mass: number;
  centerOfMass: Point;
  inertiaMatrix: number[];
}

export const VolumeCalculationNode: NodeDefinition<VolumeCalculationInputs, VolumeCalculationOutputs, VolumeCalculationParams> = {
  type: 'Analysis::VolumeCalculation',
  category: 'Analysis',
  subcategory: 'Measurement',

  metadata: {
    label: 'VolumeCalculation',
    description: 'Calculate volume and mass properties',
    
    
  },

  params: {
        precision: {
      "default": 0.01,
      "min": 0.001,
      "max": 1
    },
    density: {
      "default": 1,
      "min": 0.001,
      "max": 100,
      "description": "Material density"
    }
  },

  inputs: {
        solid: 'Shape'
  },

  outputs: {
        volume: 'number',
    mass: 'number',
    centerOfMass: 'Point',
    inertiaMatrix: 'number[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'volumeCalculation',
      params: {
        solid: inputs.solid,
        precision: params.precision,
        density: params.density
      }
    });

    return {
      volume: result,
      mass: result,
      centerOfMass: result,
      inertiaMatrix: result
    };
  }
};
