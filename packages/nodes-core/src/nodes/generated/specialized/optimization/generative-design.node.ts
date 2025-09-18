
import { NodeDefinition } from '@brepflow/types';

interface Params {
  objectives: any;
  generations: number;
  populationSize: number;
}
interface Inputs {
  designSpace: Shape;
  requirements: Data;
}
interface Outputs {
  designs: Shape[];
  paretoFront: Data;
}

export const GenerativeDesignNode: NodeDefinition<GenerativeDesignInputs, GenerativeDesignOutputs, GenerativeDesignParams> = {
  type: 'Specialized::GenerativeDesign',
  category: 'Specialized',
  subcategory: 'Optimization',

  metadata: {
    label: 'GenerativeDesign',
    description: 'AI-driven generative design',
    
    
  },

  params: {
        objectives: {
      "default": [
        "weight",
        "strength"
      ]
    },
    generations: {
      "default": 20,
      "min": 5,
      "max": 100,
      "step": 5
    },
    populationSize: {
      "default": 50,
      "min": 10,
      "max": 500,
      "step": 10
    }
  },

  inputs: {
        designSpace: 'Shape',
    requirements: 'Data'
  },

  outputs: {
        designs: 'Shape[]',
    paretoFront: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'generativeDesign',
      params: {
        designSpace: inputs.designSpace,
        requirements: inputs.requirements,
        objectives: params.objectives,
        generations: params.generations,
        populationSize: params.populationSize
      }
    });

    return {
      designs: result,
      paretoFront: result
    };
  }
};
