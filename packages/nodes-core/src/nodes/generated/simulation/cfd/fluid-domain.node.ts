
import { NodeDefinition } from '@brepflow/types';

interface Params {
  domainType: string;
  boundingBoxScale: [number, number, number];
  refinementDistance: number;
}
interface Inputs {
  geometry: Shape;
}
interface Outputs {
  fluidDomain: Shape;
  walls: Face[];
}

export const FluidDomainNode: NodeDefinition<FluidDomainInputs, FluidDomainOutputs, FluidDomainParams> = {
  type: 'Simulation::FluidDomain',
  category: 'Simulation',
  subcategory: 'CFD',

  metadata: {
    label: 'FluidDomain',
    description: 'Create fluid domain',
    
    
  },

  params: {
        domainType: {
      "default": "external",
      "options": [
        "internal",
        "external",
        "both"
      ]
    },
    boundingBoxScale: {
      "default": [
        3,
        3,
        3
      ],
      "description": "Domain size multiplier"
    },
    refinementDistance: {
      "default": 10,
      "min": 1,
      "max": 1000
    }
  },

  inputs: {
        geometry: 'Shape'
  },

  outputs: {
        fluidDomain: 'Shape',
    walls: 'Face[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fluidDomain',
      params: {
        geometry: inputs.geometry,
        domainType: params.domainType,
        boundingBoxScale: params.boundingBoxScale,
        refinementDistance: params.refinementDistance
      }
    });

    return {
      fluidDomain: result,
      walls: result
    };
  }
};
