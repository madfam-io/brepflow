
import { NodeDefinition } from '@brepflow/types';

interface Params {
  units: string;
  showAnnotation: boolean;
}
interface Inputs {
  vector1: Vector;
  vector2: Vector;
  vertex?: Point;
}
interface Outputs {
  angle: number;
  complementAngle: number;
  angleBisector: Vector;
}

export const AngleMeasurementNode: NodeDefinition<AngleMeasurementInputs, AngleMeasurementOutputs, AngleMeasurementParams> = {
  type: 'Analysis::AngleMeasurement',
  category: 'Analysis',
  subcategory: 'Measurement',

  metadata: {
    label: 'AngleMeasurement',
    description: 'Measure angles between vectors/faces',
    
    
  },

  params: {
        units: {
      "default": "degrees",
      "options": [
        "degrees",
        "radians"
      ]
    },
    showAnnotation: {
      "default": true
    }
  },

  inputs: {
        vector1: 'Vector',
    vector2: 'Vector',
    vertex: 'Point'
  },

  outputs: {
        angle: 'number',
    complementAngle: 'number',
    angleBisector: 'Vector'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'angleMeasurement',
      params: {
        vector1: inputs.vector1,
        vector2: inputs.vector2,
        vertex: inputs.vertex,
        units: params.units,
        showAnnotation: params.showAnnotation
      }
    });

    return {
      angle: result,
      complementAngle: result,
      angleBisector: result
    };
  }
};
