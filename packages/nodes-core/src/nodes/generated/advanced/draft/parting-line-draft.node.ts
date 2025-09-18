
import { NodeDefinition } from '@brepflow/types';

interface Params {
  upperAngle: number;
  lowerAngle: number;
  pullDirection: [number, number, number];
}
interface Inputs {
  solid: Shape;
  partingEdges: Edge[];
}
interface Outputs {
  drafted: Shape;
}

export const PartingLineDraftNode: NodeDefinition<PartingLineDraftInputs, PartingLineDraftOutputs, PartingLineDraftParams> = {
  type: 'Advanced::PartingLineDraft',
  category: 'Advanced',
  subcategory: 'Draft',

  metadata: {
    label: 'PartingLineDraft',
    description: 'Draft from parting line',
    
    
  },

  params: {
        upperAngle: {
      "default": 3,
      "min": 0,
      "max": 30
    },
    lowerAngle: {
      "default": 3,
      "min": 0,
      "max": 30
    },
    pullDirection: {
      "default": [
        0,
        0,
        1
      ]
    }
  },

  inputs: {
        solid: 'Shape',
    partingEdges: 'Edge[]'
  },

  outputs: {
        drafted: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'partingLineDraft',
      params: {
        solid: inputs.solid,
        partingEdges: inputs.partingEdges,
        upperAngle: params.upperAngle,
        lowerAngle: params.lowerAngle,
        pullDirection: params.pullDirection
      }
    });

    return {
      drafted: result
    };
  }
};
