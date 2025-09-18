
import { NodeDefinition } from '@brepflow/types';

interface Params {
  style: string;
  spacing: number;
}
interface Inputs {
  stairSide: Wire;
}
interface Outputs {
  balustrade: Shape;
}

export const StairBalustradeNode: NodeDefinition<StairBalustradeInputs, StairBalustradeOutputs, StairBalustradeParams> = {
  type: 'Architecture::StairBalustrade',
  category: 'Architecture',
  subcategory: 'Stairs',

  metadata: {
    label: 'StairBalustrade',
    description: 'Stair balustrade system',
    
    
  },

  params: {
        style: {
      "default": "vertical",
      "options": [
        "vertical",
        "horizontal",
        "glass",
        "cable"
      ]
    },
    spacing: {
      "default": 100,
      "min": 75,
      "max": 125
    }
  },

  inputs: {
        stairSide: 'Wire'
  },

  outputs: {
        balustrade: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'stairBalustrade',
      params: {
        stairSide: inputs.stairSide,
        style: params.style,
        spacing: params.spacing
      }
    });

    return {
      balustrade: result
    };
  }
};
