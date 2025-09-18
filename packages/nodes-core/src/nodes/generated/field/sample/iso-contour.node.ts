
import { NodeDefinition } from '@brepflow/types';

interface Params {
  value: number;
  smooth: boolean;
}
interface Inputs {
  field: ScalarField;
}
interface Outputs {
  contours: Wire[];
}

export const IsoContourNode: NodeDefinition<IsoContourInputs, IsoContourOutputs, IsoContourParams> = {
  type: 'Field::IsoContour',
  category: 'Field',
  subcategory: 'Sample',

  metadata: {
    label: 'IsoContour',
    description: 'Extract iso-contours',
    
    
  },

  params: {
        value: {
      "default": 0.5
    },
    smooth: {
      "default": true
    }
  },

  inputs: {
        field: 'ScalarField'
  },

  outputs: {
        contours: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fieldIsoContour',
      params: {
        field: inputs.field,
        value: params.value,
        smooth: params.smooth
      }
    });

    return {
      contours: result
    };
  }
};
