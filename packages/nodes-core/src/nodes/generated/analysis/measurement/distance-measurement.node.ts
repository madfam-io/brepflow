
import { NodeDefinition } from '@brepflow/types';

interface Params {
  precision: number;
  showDimension: boolean;
}
interface Inputs {
  point1: Point;
  point2: Point;
}
interface Outputs {
  distance: number;
  dimensionLine: Wire;
  midpoint: Point;
}

export const DistanceMeasurementNode: NodeDefinition<DistanceMeasurementInputs, DistanceMeasurementOutputs, DistanceMeasurementParams> = {
  type: 'Analysis::DistanceMeasurement',
  category: 'Analysis',
  subcategory: 'Measurement',

  metadata: {
    label: 'DistanceMeasurement',
    description: 'Measure distances with annotations',
    
    
  },

  params: {
        precision: {
      "default": 2,
      "min": 0,
      "max": 6,
      "description": "Decimal places"
    },
    showDimension: {
      "default": true
    }
  },

  inputs: {
        point1: 'Point',
    point2: 'Point'
  },

  outputs: {
        distance: 'number',
    dimensionLine: 'Wire',
    midpoint: 'Point'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'distanceMeasurement',
      params: {
        point1: inputs.point1,
        point2: inputs.point2,
        precision: params.precision,
        showDimension: params.showDimension
      }
    });

    return {
      distance: result,
      dimensionLine: result,
      midpoint: result
    };
  }
};
