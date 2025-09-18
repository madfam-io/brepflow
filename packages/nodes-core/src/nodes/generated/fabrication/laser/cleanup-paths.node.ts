
import { NodeDefinition } from '@brepflow/types';

interface Params {
  tolerance: number;
  removeDoubles: boolean;
}
interface Inputs {
  paths: Wire[];
}
interface Outputs {
  cleanPaths: Wire[];
}

export const CleanupPathsNode: NodeDefinition<CleanupPathsInputs, CleanupPathsOutputs, CleanupPathsParams> = {
  type: 'Fabrication::CleanupPaths',
  category: 'Fabrication',
  subcategory: 'Laser',

  metadata: {
    label: 'CleanupPaths',
    description: 'Clean and optimize paths',
    
    
  },

  params: {
        tolerance: {
      "default": 0.01,
      "min": 0.001,
      "max": 0.1
    },
    removeDoubles: {
      "default": true
    }
  },

  inputs: {
        paths: 'Wire[]'
  },

  outputs: {
        cleanPaths: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'cleanupPaths',
      params: {
        paths: inputs.paths,
        tolerance: params.tolerance,
        removeDoubles: params.removeDoubles
      }
    });

    return {
      cleanPaths: result
    };
  }
};
