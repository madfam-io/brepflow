
import { NodeDefinition } from '@brepflow/types';

interface Params {
  panels: number;
  operablePanel: string;
}
interface Inputs {
  opening: Wire;
}
interface Outputs {
  window: Shape;
  panels: Shape[];
}

export const SlidingWindowNode: NodeDefinition<SlidingWindowInputs, SlidingWindowOutputs, SlidingWindowParams> = {
  type: 'Architecture::SlidingWindow',
  category: 'Architecture',
  subcategory: 'Windows',

  metadata: {
    label: 'SlidingWindow',
    description: 'Horizontal sliding window',
    
    
  },

  params: {
        panels: {
      "default": 2,
      "min": 2,
      "max": 4,
      "step": 1
    },
    operablePanel: {
      "default": "left",
      "options": [
        "left",
        "right",
        "both"
      ]
    }
  },

  inputs: {
        opening: 'Wire'
  },

  outputs: {
        window: 'Shape',
    panels: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'slidingWindow',
      params: {
        opening: inputs.opening,
        panels: params.panels,
        operablePanel: params.operablePanel
      }
    });

    return {
      window: result,
      panels: result
    };
  }
};
