
import { NodeDefinition } from '@brepflow/types';

interface Params {
  cavityWidth: number;
  ventilationType: string;
}
interface Inputs {
  buildingFace: Face;
}
interface Outputs {
  innerSkin: Shape;
  outerSkin: Shape;
  cavity: Shape;
}

export const DoubleSkinnedFacadeNode: NodeDefinition<DoubleSkinnedFacadeInputs, DoubleSkinnedFacadeOutputs, DoubleSkinnedFacadeParams> = {
  type: 'Architecture::DoubleSkinnedFacade',
  category: 'Architecture',
  subcategory: 'Walls',

  metadata: {
    label: 'DoubleSkinnedFacade',
    description: 'Double-skin facade system',
    
    
  },

  params: {
        cavityWidth: {
      "default": 600,
      "min": 300,
      "max": 1500
    },
    ventilationType: {
      "default": "natural",
      "options": [
        "natural",
        "mechanical",
        "hybrid"
      ]
    }
  },

  inputs: {
        buildingFace: 'Face'
  },

  outputs: {
        innerSkin: 'Shape',
    outerSkin: 'Shape',
    cavity: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'doubleSkinned Facade',
      params: {
        buildingFace: inputs.buildingFace,
        cavityWidth: params.cavityWidth,
        ventilationType: params.ventilationType
      }
    });

    return {
      innerSkin: result,
      outerSkin: result,
      cavity: result
    };
  }
};
