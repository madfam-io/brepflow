
import { NodeDefinition } from '@brepflow/types';

interface Params {
  vaultType: string;
  rise: number;
}
interface Inputs {
  ceilingOutline: Wire;
}
interface Outputs {
  vaultedCeiling: Shape;
}

export const VaultedCeilingNode: NodeDefinition<VaultedCeilingInputs, VaultedCeilingOutputs, VaultedCeilingParams> = {
  type: 'Architecture::VaultedCeiling',
  category: 'Architecture',
  subcategory: 'Ceilings',

  metadata: {
    label: 'VaultedCeiling',
    description: 'Vaulted ceiling geometry',
    
    
  },

  params: {
        vaultType: {
      "default": "barrel",
      "options": [
        "barrel",
        "groin",
        "cloister",
        "dome"
      ]
    },
    rise: {
      "default": 1000,
      "min": 500,
      "max": 3000
    }
  },

  inputs: {
        ceilingOutline: 'Wire'
  },

  outputs: {
        vaultedCeiling: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'vaultedCeiling',
      params: {
        ceilingOutline: inputs.ceilingOutline,
        vaultType: params.vaultType,
        rise: params.rise
      }
    });

    return {
      vaultedCeiling: result
    };
  }
};
