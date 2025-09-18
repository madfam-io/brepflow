
import { NodeDefinition } from '@brepflow/types';

interface Params {
  tolerance: number;
  showCenter: boolean;
}
interface Inputs {
  curve: Wire;
}
interface Outputs {
  isSpiral: boolean;
  center: Point;
  pitch: number;
  turns: number;
}

export const CurveSpiralNode: NodeDefinition<CurveSpiralInputs, CurveSpiralOutputs, CurveSpiralParams> = {
  type: 'Analysis::CurveSpiral',
  category: 'Analysis',
  subcategory: 'Curves',

  metadata: {
    label: 'CurveSpiral',
    description: 'Analyze spiral properties',
    
    
  },

  params: {
        tolerance: {
      "default": 0.01,
      "min": 0.001,
      "max": 1
    },
    showCenter: {
      "default": true
    }
  },

  inputs: {
        curve: 'Wire'
  },

  outputs: {
        isSpiral: 'boolean',
    center: 'Point',
    pitch: 'number',
    turns: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'curveSpiral',
      params: {
        curve: inputs.curve,
        tolerance: params.tolerance,
        showCenter: params.showCenter
      }
    });

    return {
      isSpiral: result,
      center: result,
      pitch: result,
      turns: result
    };
  }
};
