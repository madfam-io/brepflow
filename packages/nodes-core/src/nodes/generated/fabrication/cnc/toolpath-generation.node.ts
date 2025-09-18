
import { NodeDefinition } from '@brepflow/types';

interface Params {
  strategy: string;
  toolDiameter: number;
  stepover: number;
}
interface Inputs {
  model: Shape;
  stock?: Shape;
}
interface Outputs {
  toolpath: Wire[];
  rapids: Wire[];
}

export const ToolpathGenerationNode: NodeDefinition<ToolpathGenerationInputs, ToolpathGenerationOutputs, ToolpathGenerationParams> = {
  type: 'Fabrication::ToolpathGeneration',
  category: 'Fabrication',
  subcategory: 'CNC',

  metadata: {
    label: 'ToolpathGeneration',
    description: 'Generate CNC toolpaths',
    
    
  },

  params: {
        strategy: {
      "default": "parallel",
      "options": [
        "parallel",
        "contour",
        "pocket",
        "adaptive"
      ]
    },
    toolDiameter: {
      "default": 6,
      "min": 0.1,
      "max": 50
    },
    stepover: {
      "default": 0.5,
      "min": 0.1,
      "max": 1
    }
  },

  inputs: {
        model: 'Shape',
    stock: 'Shape'
  },

  outputs: {
        toolpath: 'Wire[]',
    rapids: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'toolpathGeneration',
      params: {
        model: inputs.model,
        stock: inputs.stock,
        strategy: params.strategy,
        toolDiameter: params.toolDiameter,
        stepover: params.stepover
      }
    });

    return {
      toolpath: result,
      rapids: result
    };
  }
};
