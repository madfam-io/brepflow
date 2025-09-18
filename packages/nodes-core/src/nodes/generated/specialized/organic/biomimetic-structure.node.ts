
import { NodeDefinition } from '@brepflow/types';

interface Params {
  inspiration: string;
  density: number;
}
interface Inputs {
  shape: Shape;
}
interface Outputs {
  biomimetic: Shape;
}

export const BiomimeticStructureNode: NodeDefinition<BiomimeticStructureInputs, BiomimeticStructureOutputs, BiomimeticStructureParams> = {
  type: 'Specialized::BiomimeticStructure',
  category: 'Specialized',
  subcategory: 'Organic',

  metadata: {
    label: 'BiomimeticStructure',
    description: 'Nature-inspired structures',
    
    
  },

  params: {
        inspiration: {
      "default": "bone",
      "options": [
        "bone",
        "wood",
        "coral",
        "leaf-veins"
      ]
    },
    density: {
      "default": 0.5,
      "min": 0.1,
      "max": 0.9
    }
  },

  inputs: {
        shape: 'Shape'
  },

  outputs: {
        biomimetic: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'biomimeticStructure',
      params: {
        shape: inputs.shape,
        inspiration: params.inspiration,
        density: params.density
      }
    });

    return {
      biomimetic: result
    };
  }
};
