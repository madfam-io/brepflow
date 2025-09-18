
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  controlPoints: Point[];
}
interface Outputs {
  curve: Wire;
}

export const BezierCurveNode: NodeDefinition<BezierCurveInputs, BezierCurveOutputs, BezierCurveParams> = {
  type: 'Sketch::BezierCurve',
  category: 'Sketch',
  subcategory: 'Curves',

  metadata: {
    label: 'BezierCurve',
    description: 'Create a Bezier curve',
    
    
  },

  params: {
    
  },

  inputs: {
        controlPoints: 'Point[]'
  },

  outputs: {
        curve: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makeBezier',
      params: {
        controlPoints: inputs.controlPoints
        
      }
    });

    return {
      curve: result
    };
  }
};
