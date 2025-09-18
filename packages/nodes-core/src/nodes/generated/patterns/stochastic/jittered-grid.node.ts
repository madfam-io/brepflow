
import { NodeDefinition } from '@brepflow/types';

interface Params {
  gridSize: number;
  jitter: number;
}
interface Inputs {
  boundary: Wire;
}
interface Outputs {
  points: Point[];
}

export const JitteredGridNode: NodeDefinition<JitteredGridInputs, JitteredGridOutputs, JitteredGridParams> = {
  type: 'Patterns::JitteredGrid',
  category: 'Patterns',
  subcategory: 'Stochastic',

  metadata: {
    label: 'JitteredGrid',
    description: 'Jittered grid sampling',
    
    
  },

  params: {
        gridSize: {
      "default": 10,
      "min": 2,
      "max": 100,
      "step": 1
    },
    jitter: {
      "default": 0.5,
      "min": 0,
      "max": 1
    }
  },

  inputs: {
        boundary: 'Wire'
  },

  outputs: {
        points: 'Point[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'jitteredGrid',
      params: {
        boundary: inputs.boundary,
        gridSize: params.gridSize,
        jitter: params.jitter
      }
    });

    return {
      points: result
    };
  }
};
