
import { NodeDefinition } from '@brepflow/types';

interface Params {
  targetWeight: number;
  structureType: string;
}
interface Inputs {
  solid: Shape;
  loadPaths?: Data;
}
interface Outputs {
  lightweighted: Shape;
  weightReduction: number;
}

export const LightweightStructureNode: NodeDefinition<LightweightStructureInputs, LightweightStructureOutputs, LightweightStructureParams> = {
  type: 'Specialized::LightweightStructure',
  category: 'Specialized',
  subcategory: 'Optimization',

  metadata: {
    label: 'LightweightStructure',
    description: 'Create lightweight structure',
    
    
  },

  params: {
        targetWeight: {
      "default": 0.5,
      "min": 0.1,
      "max": 0.9
    },
    structureType: {
      "default": "hybrid",
      "options": [
        "ribs",
        "shells",
        "lattice",
        "hybrid"
      ]
    }
  },

  inputs: {
        solid: 'Shape',
    loadPaths: 'Data'
  },

  outputs: {
        lightweighted: 'Shape',
    weightReduction: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'lightweightStructure',
      params: {
        solid: inputs.solid,
        loadPaths: inputs.loadPaths,
        targetWeight: params.targetWeight,
        structureType: params.structureType
      }
    });

    return {
      lightweighted: result,
      weightReduction: result
    };
  }
};
