
import { NodeDefinition } from '@brepflow/types';

interface Params {
  type: string;
  angle: number;
  density: number;
}
interface Inputs {
  model: Shape;
}
interface Outputs {
  supports: Shape;
  supportedModel: Shape;
}

export const SupportGenerationNode: NodeDefinition<SupportGenerationInputs, SupportGenerationOutputs, SupportGenerationParams> = {
  type: 'Fabrication::SupportGeneration',
  category: 'Fabrication',
  subcategory: '3D Printing',

  metadata: {
    label: 'SupportGeneration',
    description: 'Generate support structures',
    
    
  },

  params: {
        type: {
      "default": "tree",
      "options": [
        "tree",
        "linear",
        "grid",
        "organic"
      ]
    },
    angle: {
      "default": 45,
      "min": 0,
      "max": 90
    },
    density: {
      "default": 0.2,
      "min": 0.1,
      "max": 1
    }
  },

  inputs: {
        model: 'Shape'
  },

  outputs: {
        supports: 'Shape',
    supportedModel: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'supportGeneration',
      params: {
        model: inputs.model,
        type: params.type,
        angle: params.angle,
        density: params.density
      }
    });

    return {
      supports: result,
      supportedModel: result
    };
  }
};
