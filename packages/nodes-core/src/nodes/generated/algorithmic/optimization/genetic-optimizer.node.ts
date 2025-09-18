
import { NodeDefinition } from '@brepflow/types';

interface Params {
  populationSize: number;
  generations: number;
  mutationRate: number;
  crossoverRate: number;
  elitism: number;
}
interface Inputs {
  objectives: Properties;
  constraints?: Properties;
  bounds: Properties;
}
interface Outputs {
  bestSolution: Properties;
  fitness: number;
  generations: Properties[];
  convergence: number[];
}

export const GeneticOptimizerNode: NodeDefinition<GeneticOptimizerInputs, GeneticOptimizerOutputs, GeneticOptimizerParams> = {
  type: 'Algorithmic::GeneticOptimizer',
  category: 'Algorithmic',
  subcategory: 'Optimization',

  metadata: {
    label: 'GeneticOptimizer',
    description: 'Genetic algorithm optimization',
    
    
  },

  params: {
        populationSize: {
      "default": 100,
      "min": 10,
      "max": 1000
    },
    generations: {
      "default": 50,
      "min": 5,
      "max": 500
    },
    mutationRate: {
      "default": 0.1,
      "min": 0.01,
      "max": 0.5
    },
    crossoverRate: {
      "default": 0.8,
      "min": 0.1,
      "max": 1
    },
    elitism: {
      "default": 0.1,
      "min": 0,
      "max": 0.5
    }
  },

  inputs: {
        objectives: 'Properties',
    constraints: 'Properties',
    bounds: 'Properties'
  },

  outputs: {
        bestSolution: 'Properties',
    fitness: 'number',
    generations: 'Properties[]',
    convergence: 'number[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'geneticOptimizer',
      params: {
        objectives: inputs.objectives,
        constraints: inputs.constraints,
        bounds: inputs.bounds,
        populationSize: params.populationSize,
        generations: params.generations,
        mutationRate: params.mutationRate,
        crossoverRate: params.crossoverRate,
        elitism: params.elitism
      }
    });

    return {
      bestSolution: result,
      fitness: result,
      generations: result,
      convergence: result
    };
  }
};
