
import { NodeDefinition } from '@brepflow/types';

interface Params {
  algorithm: string;
  heuristic: string;
}
interface Inputs {
  graph: Properties;
  start: Point;
  end: Point;
}
interface Outputs {
  path: Wire;
  distance: number;
  nodes: Point[];
}

export const ShortestPathNode: NodeDefinition<ShortestPathInputs, ShortestPathOutputs, ShortestPathParams> = {
  type: 'Algorithmic::ShortestPath',
  category: 'Algorithmic',
  subcategory: 'Geometry',

  metadata: {
    label: 'ShortestPath',
    description: 'Find shortest path between points',
    
    
  },

  params: {
        algorithm: {
      "default": "dijkstra",
      "options": [
        "dijkstra",
        "astar"
      ]
    },
    heuristic: {
      "default": "euclidean",
      "options": [
        "euclidean",
        "manhattan"
      ]
    }
  },

  inputs: {
        graph: 'Properties',
    start: 'Point',
    end: 'Point'
  },

  outputs: {
        path: 'Wire',
    distance: 'number',
    nodes: 'Point[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'shortestPath',
      params: {
        graph: inputs.graph,
        start: inputs.start,
        end: inputs.end,
        algorithm: params.algorithm,
        heuristic: params.heuristic
      }
    });

    return {
      path: result,
      distance: result,
      nodes: result
    };
  }
};
