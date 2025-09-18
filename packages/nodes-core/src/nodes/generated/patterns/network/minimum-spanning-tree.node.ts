
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  points: Point[];
}
interface Outputs {
  tree: Wire[];
}

export const MinimumSpanningTreeNode: NodeDefinition<MinimumSpanningTreeInputs, MinimumSpanningTreeOutputs, MinimumSpanningTreeParams> = {
  type: 'Patterns::MinimumSpanningTree',
  category: 'Patterns',
  subcategory: 'Network',

  metadata: {
    label: 'MinimumSpanningTree',
    description: 'MST network pattern',
    
    
  },

  params: {
    
  },

  inputs: {
        points: 'Point[]'
  },

  outputs: {
        tree: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'minimumSpanningTree',
      params: {
        points: inputs.points
        
      }
    });

    return {
      tree: result
    };
  }
};
