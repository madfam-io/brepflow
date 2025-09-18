
import { NodeDefinition } from '@brepflow/types';

interface Params {
  algorithm: string;
  showWeights: boolean;
}
interface Inputs {
  points: Point[];
}
interface Outputs {
  tree: Wire[];
  totalWeight: number;
  edges: Properties[];
}

export const MinimumSpanningTreeNode: NodeDefinition<MinimumSpanningTreeInputs, MinimumSpanningTreeOutputs, MinimumSpanningTreeParams> = {
  type: 'Algorithmic::MinimumSpanningTree',
  category: 'Algorithmic',
  subcategory: 'Geometry',

  metadata: {
    label: 'MinimumSpanningTree',
    description: 'Compute minimum spanning tree of points',
    
    
  },

  params: {
        algorithm: {
      "default": "kruskal",
      "options": [
        "kruskal",
        "prim"
      ]
    },
    showWeights: {
      "default": false
    }
  },

  inputs: {
        points: 'Point[]'
  },

  outputs: {
        tree: 'Wire[]',
    totalWeight: 'number',
    edges: 'Properties[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'minimumSpanningTree',
      params: {
        points: inputs.points,
        algorithm: params.algorithm,
        showWeights: params.showWeights
      }
    });

    return {
      tree: result,
      totalWeight: result,
      edges: result
    };
  }
};
