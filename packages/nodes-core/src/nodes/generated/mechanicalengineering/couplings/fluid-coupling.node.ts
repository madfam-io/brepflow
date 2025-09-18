
import { NodeDefinition } from '@brepflow/types';

interface Params {
  impellerDiameter: number;
  housingDiameter: number;
  vaneCount: number;
  fluidCapacity: number;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  coupling: Shape;
  impeller: Shape;
  turbine: Shape;
}

export const FluidCouplingNode: NodeDefinition<FluidCouplingInputs, FluidCouplingOutputs, FluidCouplingParams> = {
  type: 'MechanicalEngineering::FluidCoupling',
  category: 'MechanicalEngineering',
  subcategory: 'Couplings',

  metadata: {
    label: 'FluidCoupling',
    description: 'Create fluid coupling design',
    
    
  },

  params: {
        impellerDiameter: {
      "default": 150,
      "min": 50,
      "max": 500
    },
    housingDiameter: {
      "default": 180,
      "min": 60,
      "max": 600
    },
    vaneCount: {
      "default": 32,
      "min": 16,
      "max": 64
    },
    fluidCapacity: {
      "default": 2,
      "min": 0.5,
      "max": 20,
      "description": "Liters"
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        coupling: 'Shape',
    impeller: 'Shape',
    turbine: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fluidCoupling',
      params: {
        center: inputs.center,
        impellerDiameter: params.impellerDiameter,
        housingDiameter: params.housingDiameter,
        vaneCount: params.vaneCount,
        fluidCapacity: params.fluidCapacity
      }
    });

    return {
      coupling: result,
      impeller: result,
      turbine: result
    };
  }
};
