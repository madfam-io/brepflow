
import { NodeDefinition } from '@brepflow/types';

interface Params {
  projection: number;
  segments: number;
}
interface Inputs {
  wallOpening: Wire;
}
interface Outputs {
  bowWindow: Shape;
}

export const BowWindowNode: NodeDefinition<BowWindowInputs, BowWindowOutputs, BowWindowParams> = {
  type: 'Architecture::BowWindow',
  category: 'Architecture',
  subcategory: 'Windows',

  metadata: {
    label: 'BowWindow',
    description: 'Bow window projection',
    
    
  },

  params: {
        projection: {
      "default": 600,
      "min": 400,
      "max": 1200
    },
    segments: {
      "default": 5,
      "min": 3,
      "max": 7,
      "step": 1
    }
  },

  inputs: {
        wallOpening: 'Wire'
  },

  outputs: {
        bowWindow: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'bowWindow',
      params: {
        wallOpening: inputs.wallOpening,
        projection: params.projection,
        segments: params.segments
      }
    });

    return {
      bowWindow: result
    };
  }
};
