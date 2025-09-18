
import { NodeDefinition } from '@brepflow/types';

interface Params {
  algorithm: string;
  iterations: number;
}
interface Inputs {
  nodes: Point[];
  edges: Data;
}
interface Outputs {
  layout: Point[];
  graph: Wire[];
}

export const GraphLayoutNode: NodeDefinition<GraphLayoutInputs, GraphLayoutOutputs, GraphLayoutParams> = {
  type: 'Patterns::GraphLayout',
  category: 'Patterns',
  subcategory: 'Algorithmic',

  metadata: {
    label: 'GraphLayout',
    description: 'Graph layout algorithms',
    
    
  },

  params: {
        algorithm: {
      "default": "force-directed",
      "options": [
        "force-directed",
        "circular",
        "hierarchical",
        "spectral"
      ]
    },
    iterations: {
      "default": 100,
      "min": 10,
      "max": 1000,
      "step": 10
    }
  },

  inputs: {
        nodes: 'Point[]',
    edges: 'Data'
  },

  outputs: {
        layout: 'Point[]',
    graph: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'graphLayout',
      params: {
        nodes: inputs.nodes,
        edges: inputs.edges,
        algorithm: params.algorithm,
        iterations: params.iterations
      }
    });

    return {
      layout: result,
      graph: result
    };
  }
};
