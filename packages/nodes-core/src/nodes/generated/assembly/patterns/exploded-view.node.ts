
import { NodeDefinition } from '@brepflow/types';

interface Params {
  distance: number;
  autoSpace: boolean;
}
interface Inputs {
  assembly: Assembly;
}
interface Outputs {
  exploded: Shape[];
  paths: Wire[];
}

export const ExplodedViewNode: NodeDefinition<ExplodedViewInputs, ExplodedViewOutputs, ExplodedViewParams> = {
  type: 'Assembly::ExplodedView',
  category: 'Assembly',
  subcategory: 'Patterns',

  metadata: {
    label: 'ExplodedView',
    description: 'Create exploded view',
    
    
  },

  params: {
        distance: {
      "default": 100,
      "min": 0,
      "max": 10000
    },
    autoSpace: {
      "default": true
    }
  },

  inputs: {
        assembly: 'Assembly'
  },

  outputs: {
        exploded: 'Shape[]',
    paths: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'assemblyExplodedView',
      params: {
        assembly: inputs.assembly,
        distance: params.distance,
        autoSpace: params.autoSpace
      }
    });

    return {
      exploded: result,
      paths: result
    };
  }
};
