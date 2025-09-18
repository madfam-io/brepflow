
import { NodeDefinition } from '@brepflow/types';

interface Params {
  agents: number;
  steps: number;
  cohesion: number;
  separation: number;
  alignment: number;
}
interface Inputs {
  boundary: Box;
}
interface Outputs {
  trails: Wire[];
}

export const FlockingPatternNode: NodeDefinition<FlockingPatternInputs, FlockingPatternOutputs, FlockingPatternParams> = {
  type: 'Patterns::FlockingPattern',
  category: 'Patterns',
  subcategory: 'Algorithmic',

  metadata: {
    label: 'FlockingPattern',
    description: 'Flocking behavior simulation',
    
    
  },

  params: {
        agents: {
      "default": 50,
      "min": 10,
      "max": 200,
      "step": 5
    },
    steps: {
      "default": 100,
      "min": 10,
      "max": 1000,
      "step": 10
    },
    cohesion: {
      "default": 1,
      "min": 0,
      "max": 2
    },
    separation: {
      "default": 1,
      "min": 0,
      "max": 2
    },
    alignment: {
      "default": 1,
      "min": 0,
      "max": 2
    }
  },

  inputs: {
        boundary: 'Box'
  },

  outputs: {
        trails: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'flockingPattern',
      params: {
        boundary: inputs.boundary,
        agents: params.agents,
        steps: params.steps,
        cohesion: params.cohesion,
        separation: params.separation,
        alignment: params.alignment
      }
    });

    return {
      trails: result
    };
  }
};
