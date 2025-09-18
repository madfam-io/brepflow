
import { NodeDefinition } from '@brepflow/types';

interface Params {
  type: string;
  soilDepth: number;
}
interface Inputs {
  roofSurface: Face;
}
interface Outputs {
  greenRoof: Shape;
  layers: Shape[];
}

export const GreenRoofNode: NodeDefinition<GreenRoofInputs, GreenRoofOutputs, GreenRoofParams> = {
  type: 'Architecture::GreenRoof',
  category: 'Architecture',
  subcategory: 'Floors',

  metadata: {
    label: 'GreenRoof',
    description: 'Green roof system',
    
    
  },

  params: {
        type: {
      "default": "extensive",
      "options": [
        "extensive",
        "intensive",
        "semi-intensive"
      ]
    },
    soilDepth: {
      "default": 100,
      "min": 50,
      "max": 500
    }
  },

  inputs: {
        roofSurface: 'Face'
  },

  outputs: {
        greenRoof: 'Shape',
    layers: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'greenRoof',
      params: {
        roofSurface: inputs.roofSurface,
        type: params.type,
        soilDepth: params.soilDepth
      }
    });

    return {
      greenRoof: result,
      layers: result
    };
  }
};
