
import { NodeDefinition } from '@brepflow/types';

interface Params {
  majorRadius: number;
  minorRadius: number;
  startAngle: number;
  endAngle: number;
}
interface Inputs {
  center?: Point;
}
interface Outputs {
  curve: Wire;
}

export const EllipseNode: NodeDefinition<EllipseInputs, EllipseOutputs, EllipseParams> = {
  type: 'Sketch::Ellipse',
  category: 'Sketch',
  subcategory: 'Curves',

  metadata: {
    label: 'Ellipse',
    description: 'Create an ellipse',
    
    
  },

  params: {
        majorRadius: {
      "default": 100,
      "min": 0.1,
      "max": 10000
    },
    minorRadius: {
      "default": 50,
      "min": 0.1,
      "max": 10000
    },
    startAngle: {
      "default": 0,
      "min": 0,
      "max": 360
    },
    endAngle: {
      "default": 360,
      "min": 0,
      "max": 360
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        curve: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makeEllipse',
      params: {
        center: inputs.center,
        majorRadius: params.majorRadius,
        minorRadius: params.minorRadius,
        startAngle: params.startAngle,
        endAngle: params.endAngle
      }
    });

    return {
      curve: result
    };
  }
};
