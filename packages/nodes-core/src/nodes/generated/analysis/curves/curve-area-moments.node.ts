
import { NodeDefinition } from '@brepflow/types';

interface Params {
  precision: number;
  showCentroid: boolean;
}
interface Inputs {
  curve: Wire;
}
interface Outputs {
  area: number;
  centroid: Point;
  momentX: number;
  momentY: number;
}

export const CurveAreaMomentsNode: NodeDefinition<CurveAreaMomentsInputs, CurveAreaMomentsOutputs, CurveAreaMomentsParams> = {
  type: 'Analysis::CurveAreaMoments',
  category: 'Analysis',
  subcategory: 'Curves',

  metadata: {
    label: 'CurveAreaMoments',
    description: 'Calculate area moments for closed curves',
    
    
  },

  params: {
        precision: {
      "default": 0.01,
      "min": 0.001,
      "max": 1
    },
    showCentroid: {
      "default": true
    }
  },

  inputs: {
        curve: 'Wire'
  },

  outputs: {
        area: 'number',
    centroid: 'Point',
    momentX: 'number',
    momentY: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'curveAreaMoments',
      params: {
        curve: inputs.curve,
        precision: params.precision,
        showCentroid: params.showCentroid
      }
    });

    return {
      area: result,
      centroid: result,
      momentX: result,
      momentY: result
    };
  }
};
