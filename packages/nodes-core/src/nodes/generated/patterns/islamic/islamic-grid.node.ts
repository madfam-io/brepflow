
import { NodeDefinition } from '@brepflow/types';

interface Params {
  gridType: string;
  spacing: number;
}
interface Inputs {
  boundary: Wire;
}
interface Outputs {
  grid: Wire[];
}

export const IslamicGridNode: NodeDefinition<IslamicGridInputs, IslamicGridOutputs, IslamicGridParams> = {
  type: 'Patterns::IslamicGrid',
  category: 'Patterns',
  subcategory: 'Islamic',

  metadata: {
    label: 'IslamicGrid',
    description: 'Islamic grid system',
    
    
  },

  params: {
        gridType: {
      "default": "octagonal",
      "options": [
        "square",
        "hexagonal",
        "octagonal"
      ]
    },
    spacing: {
      "default": 10,
      "min": 1
    }
  },

  inputs: {
        boundary: 'Wire'
  },

  outputs: {
        grid: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'islamicGrid',
      params: {
        boundary: inputs.boundary,
        gridType: params.gridType,
        spacing: params.spacing
      }
    });

    return {
      grid: result
    };
  }
};
