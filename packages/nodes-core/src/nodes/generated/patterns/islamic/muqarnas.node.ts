
import { NodeDefinition } from '@brepflow/types';

interface Params {
  levels: number;
  cellType: string;
}
interface Inputs {
  base: Face;
}
interface Outputs {
  muqarnas: Shape[];
}

export const MuqarnasNode: NodeDefinition<MuqarnasInputs, MuqarnasOutputs, MuqarnasParams> = {
  type: 'Patterns::Muqarnas',
  category: 'Patterns',
  subcategory: 'Islamic',

  metadata: {
    label: 'Muqarnas',
    description: 'Muqarnas honeycomb pattern',
    
    
  },

  params: {
        levels: {
      "default": 3,
      "min": 1,
      "max": 8,
      "step": 1
    },
    cellType: {
      "default": "mixed",
      "options": [
        "square",
        "octagonal",
        "mixed"
      ]
    }
  },

  inputs: {
        base: 'Face'
  },

  outputs: {
        muqarnas: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'muqarnas',
      params: {
        base: inputs.base,
        levels: params.levels,
        cellType: params.cellType
      }
    });

    return {
      muqarnas: result
    };
  }
};
