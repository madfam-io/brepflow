
import { NodeDefinition } from '@brepflow/types';

interface Params {
  style: string;
  tracery: boolean;
}
interface Inputs {
  opening: Wire;
}
interface Outputs {
  gothicWindow: Shape;
  tracery: Wire[];
}

export const GothicWindowNode: NodeDefinition<GothicWindowInputs, GothicWindowOutputs, GothicWindowParams> = {
  type: 'Architecture::GothicWindow',
  category: 'Architecture',
  subcategory: 'Windows',

  metadata: {
    label: 'GothicWindow',
    description: 'Gothic arch window',
    
    
  },

  params: {
        style: {
      "default": "equilateral",
      "options": [
        "lancet",
        "equilateral",
        "flamboyant",
        "perpendicular"
      ]
    },
    tracery: {
      "default": true
    }
  },

  inputs: {
        opening: 'Wire'
  },

  outputs: {
        gothicWindow: 'Shape',
    tracery: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'gothicWindow',
      params: {
        opening: inputs.opening,
        style: params.style,
        tracery: params.tracery
      }
    });

    return {
      gothicWindow: result,
      tracery: result
    };
  }
};
