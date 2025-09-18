
import { NodeDefinition } from '@brepflow/types';

interface Params {
  tolerance: number;
  checkClosed: boolean;
  checkValid: boolean;
}
interface Inputs {
  geometry: Shape;
}
interface Outputs {
  isValid: boolean;
  isClosed: boolean;
  errors: string[];
  problemAreas: Shape[];
}

export const GeometryValidationNode: NodeDefinition<GeometryValidationInputs, GeometryValidationOutputs, GeometryValidationParams> = {
  type: 'Analysis::GeometryValidation',
  category: 'Analysis',
  subcategory: 'Quality',

  metadata: {
    label: 'GeometryValidation',
    description: 'Validate geometry integrity',
    
    
  },

  params: {
        tolerance: {
      "default": 0.01,
      "min": 0.001,
      "max": 1
    },
    checkClosed: {
      "default": true
    },
    checkValid: {
      "default": true
    }
  },

  inputs: {
        geometry: 'Shape'
  },

  outputs: {
        isValid: 'boolean',
    isClosed: 'boolean',
    errors: 'string[]',
    problemAreas: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'geometryValidation',
      params: {
        geometry: inputs.geometry,
        tolerance: params.tolerance,
        checkClosed: params.checkClosed,
        checkValid: params.checkValid
      }
    });

    return {
      isValid: result,
      isClosed: result,
      errors: result,
      problemAreas: result
    };
  }
};
