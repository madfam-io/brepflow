
import { NodeDefinition } from '@brepflow/types';

interface Params {
  population: number;
  generations: number;
  mutationRate: number;
}
interface Inputs {
  fitness: Data;
  constraints?: Data;
}
interface Outputs {
  best: Shape;
  population: Shape[];
}

export const GeneticAlgorithmNode: NodeDefinition<GeneticAlgorithmInputs, GeneticAlgorithmOutputs, GeneticAlgorithmParams> = {
  type: 'Patterns::GeneticAlgorithm',
  category: 'Patterns',
  subcategory: 'Procedural',

  metadata: {
    label: 'GeneticAlgorithm',
    description: 'GA-based pattern optimization',
    
    
  },

  params: {
        population: {
      "default": 50,
      "min": 10,
      "max": 200,
      "step": 5
    },
    generations: {
      "default": 100,
      "min": 10,
      "max": 1000,
      "step": 10
    },
    mutationRate: {
      "default": 0.1,
      "min": 0,
      "max": 1
    }
  },

  inputs: {
        fitness: 'Data',
    constraints: 'Data'
  },

  outputs: {
        best: 'Shape',
    population: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'geneticAlgorithm',
      params: {
        fitness: inputs.fitness,
        constraints: inputs.constraints,
        population: params.population,
        generations: params.generations,
        mutationRate: params.mutationRate
      }
    });

    return {
      best: result,
      population: result
    };
  }
};
