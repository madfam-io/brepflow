
import { NodeDefinition } from '@brepflow/types';

interface Params {
  name: string;
  suppressedComponents: string;
}
interface Inputs {
  assembly: Assembly;
}
interface Outputs {
  configuration: Configuration;
}

export const ConfigurationNode: NodeDefinition<ConfigurationInputs, ConfigurationOutputs, ConfigurationParams> = {
  type: 'Assembly::Configuration',
  category: 'Assembly',
  subcategory: 'Patterns',

  metadata: {
    label: 'Configuration',
    description: 'Create assembly configuration',
    
    
  },

  params: {
        name: {
      "default": "Default"
    },
    suppressedComponents: {
      "default": ""
    }
  },

  inputs: {
        assembly: 'Assembly'
  },

  outputs: {
        configuration: 'Configuration'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'assemblyConfiguration',
      params: {
        assembly: inputs.assembly,
        name: params.name,
        suppressedComponents: params.suppressedComponents
      }
    });

    return {
      configuration: result
    };
  }
};
