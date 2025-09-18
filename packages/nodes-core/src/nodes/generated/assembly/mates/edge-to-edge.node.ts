
import { NodeDefinition } from '@brepflow/types';

interface Params {
  alignment: string;
}
interface Inputs {
  edge1: Edge;
  edge2: Edge;
}
interface Outputs {
  mated: Shape[];
  mate: Mate;
}

export const EdgeToEdgeNode: NodeDefinition<EdgeToEdgeInputs, EdgeToEdgeOutputs, EdgeToEdgeParams> = {
  type: 'Assembly::EdgeToEdge',
  category: 'Assembly',
  subcategory: 'Mates',

  metadata: {
    label: 'EdgeToEdge',
    description: 'Mate two edges together',
    
    
  },

  params: {
        alignment: {
      "default": "aligned",
      "options": [
        "aligned",
        "anti-aligned"
      ]
    }
  },

  inputs: {
        edge1: 'Edge',
    edge2: 'Edge'
  },

  outputs: {
        mated: 'Shape[]',
    mate: 'Mate'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mateEdgeToEdge',
      params: {
        edge1: inputs.edge1,
        edge2: inputs.edge2,
        alignment: params.alignment
      }
    });

    return {
      mated: result,
      mate: result
    };
  }
};
