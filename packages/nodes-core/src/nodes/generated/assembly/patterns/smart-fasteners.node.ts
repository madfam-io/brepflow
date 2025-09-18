
import { NodeDefinition } from '@brepflow/types';

interface Params {
  type: string;
  size: number;
  autoSize: boolean;
}
interface Inputs {
  holes: Face[];
}
interface Outputs {
  fasteners: Shape[];
}

export const SmartFastenersNode: NodeDefinition<SmartFastenersInputs, SmartFastenersOutputs, SmartFastenersParams> = {
  type: 'Assembly::SmartFasteners',
  category: 'Assembly',
  subcategory: 'Patterns',

  metadata: {
    label: 'SmartFasteners',
    description: 'Add smart fasteners',
    
    
  },

  params: {
        type: {
      "default": "bolt",
      "options": [
        "bolt",
        "screw",
        "rivet",
        "weld"
      ]
    },
    size: {
      "default": 10,
      "min": 1,
      "max": 100
    },
    autoSize: {
      "default": true
    }
  },

  inputs: {
        holes: 'Face[]'
  },

  outputs: {
        fasteners: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'assemblySmartFasteners',
      params: {
        holes: inputs.holes,
        type: params.type,
        size: params.size,
        autoSize: params.autoSize
      }
    });

    return {
      fasteners: result
    };
  }
};
