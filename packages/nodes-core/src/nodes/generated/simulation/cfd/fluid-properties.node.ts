
import { NodeDefinition } from '@brepflow/types';

interface Params {
  fluid: string;
  density: number;
  viscosity: number;
  compressible: boolean;
}
interface Inputs {
  domain: Shape;
}
interface Outputs {
  fluidDomain: Shape;
  fluidData: Data;
}

export const FluidPropertiesNode: NodeDefinition<FluidPropertiesInputs, FluidPropertiesOutputs, FluidPropertiesParams> = {
  type: 'Simulation::FluidProperties',
  category: 'Simulation',
  subcategory: 'CFD',

  metadata: {
    label: 'FluidProperties',
    description: 'Set fluid properties',
    
    
  },

  params: {
        fluid: {
      "default": "air",
      "options": [
        "air",
        "water",
        "oil",
        "custom"
      ]
    },
    density: {
      "default": 1.225,
      "min": 0.001,
      "max": 20000,
      "description": "kg/m³"
    },
    viscosity: {
      "default": 0.0000181,
      "min": 1e-10,
      "max": 100,
      "description": "Pa·s"
    },
    compressible: {
      "default": false
    }
  },

  inputs: {
        domain: 'Shape'
  },

  outputs: {
        fluidDomain: 'Shape',
    fluidData: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fluidProperties',
      params: {
        domain: inputs.domain,
        fluid: params.fluid,
        density: params.density,
        viscosity: params.viscosity,
        compressible: params.compressible
      }
    });

    return {
      fluidDomain: result,
      fluidData: result
    };
  }
};
