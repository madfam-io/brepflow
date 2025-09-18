
import { NodeDefinition } from '@brepflow/types';

interface Params {
  algorithm: string;
}
interface Inputs {
  graph: Wire[];
  start: Point;
  end: Point;
}
interface Outputs {
  path: Wire;
  distance: Number;
}

export const ShortestPathNode: NodeDefinition<ShortestPathInputs, ShortestPathOutputs, ShortestPathParams> = {
  type: 'Patterns::ShortestPath',
  category: 'Patterns',
  subcategory: 'Algorithmic',

  metadata: {
    label: 'ShortestPath',
    description: 'Shortest path algorithms',
    
    
  },

  params: {
        algorithm: {
      "default": "dijkstra",
      "options": [
        "dijkstra",
        "a-star",
        "bellman-ford"
      ]
    }
  },

  inputs: {
        graph: 'Wire[]',
    start: 'Point',
    end: 'Point'
  },

  outputs: {
        path: 'Wire',
    distance: 'Number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'shortestPath',
      params: {
        graph: inputs.graph,
        start: inputs.start,
        end: inputs.end,
        algorithm: params.algorithm
      }
    });

    return {
      path: result,
      distance: result
    };
  }
};
