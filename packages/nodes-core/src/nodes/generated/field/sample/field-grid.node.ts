
import { NodeDefinition } from '@brepflow/types';

interface Params {
  resolutionX: number;
  resolutionY: number;
  resolutionZ: number;
}
interface Inputs {
  field: ScalarField;
  bounds: Box;
}
interface Outputs {
  grid: Data;
  points: Point[];
  values: number[];
}

export const FieldGridNode: NodeDefinition<FieldGridInputs, FieldGridOutputs, FieldGridParams> = {
  type: 'Field::FieldGrid',
  category: 'Field',
  subcategory: 'Sample',

  metadata: {
    label: 'FieldGrid',
    description: 'Sample field on grid',
    
    
  },

  params: {
        resolutionX: {
      "default": 10,
      "min": 2,
      "max": 100,
      "step": 1
    },
    resolutionY: {
      "default": 10,
      "min": 2,
      "max": 100,
      "step": 1
    },
    resolutionZ: {
      "default": 10,
      "min": 2,
      "max": 100,
      "step": 1
    }
  },

  inputs: {
        field: 'ScalarField',
    bounds: 'Box'
  },

  outputs: {
        grid: 'Data',
    points: 'Point[]',
    values: 'number[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fieldGrid',
      params: {
        field: inputs.field,
        bounds: inputs.bounds,
        resolutionX: params.resolutionX,
        resolutionY: params.resolutionY,
        resolutionZ: params.resolutionZ
      }
    });

    return {
      grid: result,
      points: result,
      values: result
    };
  }
};
