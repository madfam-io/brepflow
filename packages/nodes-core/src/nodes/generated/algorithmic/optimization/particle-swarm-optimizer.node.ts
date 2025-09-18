
import { NodeDefinition } from '@brepflow/types';

interface Params {
  swarmSize: number;
  iterations: number;
  inertia: number;
  cognitive: number;
  social: number;
}
interface Inputs {
  objective: Properties;
  bounds: Properties;
}
interface Outputs {
  globalBest: Properties;
  bestValue: number;
  swarmHistory: Properties[];
}

export const ParticleSwarmOptimizerNode: NodeDefinition<ParticleSwarmOptimizerInputs, ParticleSwarmOptimizerOutputs, ParticleSwarmOptimizerParams> = {
  type: 'Algorithmic::ParticleSwarmOptimizer',
  category: 'Algorithmic',
  subcategory: 'Optimization',

  metadata: {
    label: 'ParticleSwarmOptimizer',
    description: 'Particle swarm optimization',
    
    
  },

  params: {
        swarmSize: {
      "default": 50,
      "min": 10,
      "max": 500
    },
    iterations: {
      "default": 100,
      "min": 10,
      "max": 1000
    },
    inertia: {
      "default": 0.7,
      "min": 0.1,
      "max": 1
    },
    cognitive: {
      "default": 2,
      "min": 0.1,
      "max": 4
    },
    social: {
      "default": 2,
      "min": 0.1,
      "max": 4
    }
  },

  inputs: {
        objective: 'Properties',
    bounds: 'Properties'
  },

  outputs: {
        globalBest: 'Properties',
    bestValue: 'number',
    swarmHistory: 'Properties[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'particleSwarmOptimizer',
      params: {
        objective: inputs.objective,
        bounds: inputs.bounds,
        swarmSize: params.swarmSize,
        iterations: params.iterations,
        inertia: params.inertia,
        cognitive: params.cognitive,
        social: params.social
      }
    });

    return {
      globalBest: result,
      bestValue: result,
      swarmHistory: result
    };
  }
};
