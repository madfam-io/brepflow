
import { NodeDefinition } from '@brepflow/types';

interface Params {
  parameter: number;
  order: number;
  vectorScale: number;
}
interface Inputs {
  curve: Wire;
}
interface Outputs {
  point: Point;
  firstDerivative: Vector;
  secondDerivative: Vector;
  thirdDerivative: Vector;
}

export const CurveDerivativesNode: NodeDefinition<CurveDerivativesInputs, CurveDerivativesOutputs, CurveDerivativesParams> = {
  type: 'Analysis::CurveDerivatives',
  category: 'Analysis',
  subcategory: 'Curves',

  metadata: {
    label: 'CurveDerivatives',
    description: 'Calculate curve derivatives',
    
    
  },

  params: {
        parameter: {
      "default": 0.5,
      "min": 0,
      "max": 1
    },
    order: {
      "default": 2,
      "min": 1,
      "max": 3
    },
    vectorScale: {
      "default": 1,
      "min": 0.1,
      "max": 10
    }
  },

  inputs: {
        curve: 'Wire'
  },

  outputs: {
        point: 'Point',
    firstDerivative: 'Vector',
    secondDerivative: 'Vector',
    thirdDerivative: 'Vector'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'curveDerivatives',
      params: {
        curve: inputs.curve,
        parameter: params.parameter,
        order: params.order,
        vectorScale: params.vectorScale
      }
    });

    return {
      point: result,
      firstDerivative: result,
      secondDerivative: result,
      thirdDerivative: result
    };
  }
};
