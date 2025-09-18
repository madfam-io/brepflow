
import { NodeDefinition } from '@brepflow/types';

interface Params {
  iterations: number;
  angle: number;
}
interface Inputs {
  startSegment: Edge;
}
interface Outputs {
  curve: Wire;
}

export const DragonCurveNode: NodeDefinition<DragonCurveInputs, DragonCurveOutputs, DragonCurveParams> = {
  type: 'Patterns::DragonCurve',
  category: 'Patterns',
  subcategory: 'Fractals',

  metadata: {
    label: 'DragonCurve',
    description: 'Dragon curve fractal',
    
    
  },

  params: {
        iterations: {
      "default": 10,
      "min": 0,
      "max": 15,
      "step": 1
    },
    angle: {
      "default": 90,
      "min": 0,
      "max": 180
    }
  },

  inputs: {
        startSegment: 'Edge'
  },

  outputs: {
        curve: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'dragonCurve',
      params: {
        startSegment: inputs.startSegment,
        iterations: params.iterations,
        angle: params.angle
      }
    });

    return {
      curve: result
    };
  }
};
