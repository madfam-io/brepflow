
import { NodeDefinition } from '@brepflow/types';

interface Params {
  keepHoles: boolean;
}
interface Inputs {
  trimmedSurface: Face;
}
interface Outputs {
  untrimmedSurface: Face;
}

export const UntrimSurfaceNode: NodeDefinition<UntrimSurfaceInputs, UntrimSurfaceOutputs, UntrimSurfaceParams> = {
  type: 'Advanced::UntrimSurface',
  category: 'Advanced',
  subcategory: 'Surface',

  metadata: {
    label: 'UntrimSurface',
    description: 'Remove trimming from surface',
    
    
  },

  params: {
        keepHoles: {
      "default": false
    }
  },

  inputs: {
        trimmedSurface: 'Face'
  },

  outputs: {
        untrimmedSurface: 'Face'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'untrimSurface',
      params: {
        trimmedSurface: inputs.trimmedSurface,
        keepHoles: params.keepHoles
      }
    });

    return {
      untrimmedSurface: result
    };
  }
};
