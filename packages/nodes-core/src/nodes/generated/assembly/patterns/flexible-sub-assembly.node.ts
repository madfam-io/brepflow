
import { NodeDefinition } from '@brepflow/types';

interface Params {
  flexibility: string;
}
interface Inputs {
  components: Shape[];
  joints?: Joint[];
}
interface Outputs {
  subAssembly: Assembly;
}

export const FlexibleSubAssemblyNode: NodeDefinition<FlexibleSubAssemblyInputs, FlexibleSubAssemblyOutputs, FlexibleSubAssemblyParams> = {
  type: 'Assembly::FlexibleSubAssembly',
  category: 'Assembly',
  subcategory: 'Patterns',

  metadata: {
    label: 'FlexibleSubAssembly',
    description: 'Create flexible sub-assembly',
    
    
  },

  params: {
        flexibility: {
      "default": "flexible",
      "options": [
        "rigid",
        "flexible"
      ]
    }
  },

  inputs: {
        components: 'Shape[]',
    joints: 'Joint[]'
  },

  outputs: {
        subAssembly: 'Assembly'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'assemblyFlexible',
      params: {
        components: inputs.components,
        joints: inputs.joints,
        flexibility: params.flexibility
      }
    });

    return {
      subAssembly: result
    };
  }
};
