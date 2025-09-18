
import { NodeDefinition } from '@brepflow/types';

interface Params {
  distance: number;
  side: string;
}
interface Inputs {
  curve: Wire;
}
interface Outputs {
  offset: Wire;
}

export const OffsetNode: NodeDefinition<OffsetInputs, OffsetOutputs, OffsetParams> = {
  type: 'Sketch::Offset',
  category: 'Sketch',
  subcategory: 'Curves',

  metadata: {
    label: 'Offset',
    description: 'Offset a curve',
    
    
  },

  params: {
        distance: {
      "default": 10,
      "min": -10000,
      "max": 10000
    },
    side: {
      "default": "right",
      "options": [
        "left",
        "right",
        "both"
      ]
    }
  },

  inputs: {
        curve: 'Wire'
  },

  outputs: {
        offset: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'offsetCurve',
      params: {
        curve: inputs.curve,
        distance: params.distance,
        side: params.side
      }
    });

    return {
      offset: result
    };
  }
};
