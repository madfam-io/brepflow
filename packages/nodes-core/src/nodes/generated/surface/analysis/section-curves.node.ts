
import { NodeDefinition } from '@brepflow/types';

interface Params {
  planeNormal: [number, number, number];
  spacing: number;
  count: number;
}
interface Inputs {
  shape: Shape;
}
interface Outputs {
  sections: Wire[];
}

export const SectionCurvesNode: NodeDefinition<SectionCurvesInputs, SectionCurvesOutputs, SectionCurvesParams> = {
  type: 'Surface::SectionCurves',
  category: 'Surface',
  subcategory: 'Analysis',

  metadata: {
    label: 'SectionCurves',
    description: 'Extract section curves',
    
    
  },

  params: {
        planeNormal: {
      "default": [
        0,
        0,
        1
      ]
    },
    spacing: {
      "default": 10,
      "min": 0.1,
      "max": 1000
    },
    count: {
      "default": 10,
      "min": 1,
      "max": 100,
      "step": 1
    }
  },

  inputs: {
        shape: 'Shape'
  },

  outputs: {
        sections: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'sectionCurves',
      params: {
        shape: inputs.shape,
        planeNormal: params.planeNormal,
        spacing: params.spacing,
        count: params.count
      }
    });

    return {
      sections: result
    };
  }
};
