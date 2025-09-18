
import { NodeDefinition } from '@brepflow/types';

interface Params {
  interfaceLayers: number;
  interfaceDensity: number;
}
interface Inputs {
  supports: Shape;
}
interface Outputs {
  interface: Shape;
}

export const SolubleSupportInterfaceNode: NodeDefinition<SolubleSupportInterfaceInputs, SolubleSupportInterfaceOutputs, SolubleSupportInterfaceParams> = {
  type: 'Fabrication::SolubleSupportInterface',
  category: 'Fabrication',
  subcategory: '3D Printing',

  metadata: {
    label: 'SolubleSupportInterface',
    description: 'Soluble support interface',
    
    
  },

  params: {
        interfaceLayers: {
      "default": 2,
      "min": 1,
      "max": 5,
      "step": 1
    },
    interfaceDensity: {
      "default": 0.9,
      "min": 0.5,
      "max": 1
    }
  },

  inputs: {
        supports: 'Shape'
  },

  outputs: {
        interface: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'solubleSupportInterface',
      params: {
        supports: inputs.supports,
        interfaceLayers: params.interfaceLayers,
        interfaceDensity: params.interfaceDensity
      }
    });

    return {
      interface: result
    };
  }
};
