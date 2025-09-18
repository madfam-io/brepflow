
import { NodeDefinition } from '@brepflow/types';

interface Params {
  gradient: number;
  width: number;
  transitionLength: number;
}
interface Inputs {
  rampPath: Wire;
}
interface Outputs {
  vehicleRamp: Shape;
}

export const VehicleRampNode: NodeDefinition<VehicleRampInputs, VehicleRampOutputs, VehicleRampParams> = {
  type: 'Architecture::VehicleRamp',
  category: 'Architecture',
  subcategory: 'Ramps',

  metadata: {
    label: 'VehicleRamp',
    description: 'Vehicular access ramp',
    
    
  },

  params: {
        gradient: {
      "default": 0.15,
      "min": 0.1,
      "max": 0.2
    },
    width: {
      "default": 6000,
      "min": 5000,
      "max": 8000
    },
    transitionLength: {
      "default": 3000,
      "min": 2000,
      "max": 4000
    }
  },

  inputs: {
        rampPath: 'Wire'
  },

  outputs: {
        vehicleRamp: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'vehicleRamp',
      params: {
        rampPath: inputs.rampPath,
        gradient: params.gradient,
        width: params.width,
        transitionLength: params.transitionLength
      }
    });

    return {
      vehicleRamp: result
    };
  }
};
