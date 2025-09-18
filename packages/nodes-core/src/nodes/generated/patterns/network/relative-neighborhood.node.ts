
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  points: Point[];
}
interface Outputs {
  network: Wire[];
}

export const RelativeNeighborhoodNode: NodeDefinition<RelativeNeighborhoodInputs, RelativeNeighborhoodOutputs, RelativeNeighborhoodParams> = {
  type: 'Patterns::RelativeNeighborhood',
  category: 'Patterns',
  subcategory: 'Network',

  metadata: {
    label: 'RelativeNeighborhood',
    description: 'RNG network pattern',
    
    
  },

  params: {
    
  },

  inputs: {
        points: 'Point[]'
  },

  outputs: {
        network: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'relativeNeighborhood',
      params: {
        points: inputs.points
        
      }
    });

    return {
      network: result
    };
  }
};
