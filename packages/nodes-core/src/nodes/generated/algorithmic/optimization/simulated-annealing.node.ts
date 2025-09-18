
import { NodeDefinition } from '@brepflow/types';

interface Params {
  initialTemp: number;
  finalTemp: number;
  coolingRate: number;
  maxIterations: number;
}
interface Inputs {
  objective: Properties;
  initialSolution: Properties;
}
interface Outputs {
  bestSolution: Properties;
  bestValue: number;
  temperature: number[];
  values: number[];
}

export const SimulatedAnnealingNode: NodeDefinition<SimulatedAnnealingInputs, SimulatedAnnealingOutputs, SimulatedAnnealingParams> = {
  type: 'Algorithmic::SimulatedAnnealing',
  category: 'Algorithmic',
  subcategory: 'Optimization',

  metadata: {
    label: 'SimulatedAnnealing',
    description: 'Simulated annealing optimization',
    
    
  },

  params: {
        initialTemp: {
      "default": 1000,
      "min": 1,
      "max": 10000
    },
    finalTemp: {
      "default": 0.1,
      "min": 0.001,
      "max": 10
    },
    coolingRate: {
      "default": 0.95,
      "min": 0.8,
      "max": 0.99
    },
    maxIterations: {
      "default": 1000,
      "min": 100,
      "max": 10000
    }
  },

  inputs: {
        objective: 'Properties',
    initialSolution: 'Properties'
  },

  outputs: {
        bestSolution: 'Properties',
    bestValue: 'number',
    temperature: 'number[]',
    values: 'number[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'simulatedAnnealing',
      params: {
        objective: inputs.objective,
        initialSolution: inputs.initialSolution,
        initialTemp: params.initialTemp,
        finalTemp: params.finalTemp,
        coolingRate: params.coolingRate,
        maxIterations: params.maxIterations
      }
    });

    return {
      bestSolution: result,
      bestValue: result,
      temperature: result,
      values: result
    };
  }
};
