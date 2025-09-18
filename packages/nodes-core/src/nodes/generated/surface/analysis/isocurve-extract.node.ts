
import { NodeDefinition } from '@brepflow/types';

interface Params {
  direction: string;
  count: number;
}
interface Inputs {
  surface: Face;
}
interface Outputs {
  isocurves: Wire[];
}

export const IsocurveExtractNode: NodeDefinition<IsocurveExtractInputs, IsocurveExtractOutputs, IsocurveExtractParams> = {
  type: 'Surface::IsocurveExtract',
  category: 'Surface',
  subcategory: 'Analysis',

  metadata: {
    label: 'IsocurveExtract',
    description: 'Extract isocurves',
    
    
  },

  params: {
        direction: {
      "default": "both",
      "options": [
        "U",
        "V",
        "both"
      ]
    },
    count: {
      "default": 10,
      "min": 1,
      "max": 100,
      "step": 1
    }
  },

  inputs: {
        surface: 'Face'
  },

  outputs: {
        isocurves: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'isocurveExtract',
      params: {
        surface: inputs.surface,
        direction: params.direction,
        count: params.count
      }
    });

    return {
      isocurves: result
    };
  }
};
