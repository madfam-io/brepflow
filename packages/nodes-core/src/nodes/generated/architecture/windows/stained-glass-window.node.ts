
import { NodeDefinition } from '@brepflow/types';

interface Params {
  pattern: string;
  leadWidth: number;
}
interface Inputs {
  opening: Wire;
  pattern?: Wire[];
}
interface Outputs {
  stainedGlass: Shape;
  leadCame: Wire[];
}

export const StainedGlassWindowNode: NodeDefinition<StainedGlassWindowInputs, StainedGlassWindowOutputs, StainedGlassWindowParams> = {
  type: 'Architecture::StainedGlassWindow',
  category: 'Architecture',
  subcategory: 'Windows',

  metadata: {
    label: 'StainedGlassWindow',
    description: 'Stained glass window',
    
    
  },

  params: {
        pattern: {
      "default": "geometric",
      "options": [
        "geometric",
        "floral",
        "abstract",
        "pictorial"
      ]
    },
    leadWidth: {
      "default": 6,
      "min": 4,
      "max": 10
    }
  },

  inputs: {
        opening: 'Wire',
    pattern: 'Wire[]'
  },

  outputs: {
        stainedGlass: 'Shape',
    leadCame: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'stainedGlassWindow',
      params: {
        opening: inputs.opening,
        pattern: inputs.pattern,
        pattern: params.pattern,
        leadWidth: params.leadWidth
      }
    });

    return {
      stainedGlass: result,
      leadCame: result
    };
  }
};
