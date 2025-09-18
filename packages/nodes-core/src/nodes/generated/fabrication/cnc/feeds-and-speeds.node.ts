
import { NodeDefinition } from '@brepflow/types';

interface Params {
  material: string;
  toolMaterial: string;
  toolDiameter: number;
}
type Inputs = {};
interface Outputs {
  spindleSpeed: Number;
  feedRate: Number;
  chipLoad: Number;
}

export const FeedsAndSpeedsNode: NodeDefinition<FeedsAndSpeedsInputs, FeedsAndSpeedsOutputs, FeedsAndSpeedsParams> = {
  type: 'Fabrication::FeedsAndSpeeds',
  category: 'Fabrication',
  subcategory: 'CNC',

  metadata: {
    label: 'FeedsAndSpeeds',
    description: 'Calculate feeds and speeds',
    
    
  },

  params: {
        material: {
      "default": "aluminum",
      "options": [
        "aluminum",
        "steel",
        "stainless",
        "titanium",
        "plastic",
        "wood"
      ]
    },
    toolMaterial: {
      "default": "carbide",
      "options": [
        "hss",
        "carbide",
        "ceramic",
        "diamond"
      ]
    },
    toolDiameter: {
      "default": 6,
      "min": 0.1,
      "max": 50
    }
  },

  inputs: {
    
  },

  outputs: {
        spindleSpeed: 'Number',
    feedRate: 'Number',
    chipLoad: 'Number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'feedsAndSpeeds',
      params: {
        
        material: params.material,
        toolMaterial: params.toolMaterial,
        toolDiameter: params.toolDiameter
      }
    });

    return {
      spindleSpeed: result,
      feedRate: result,
      chipLoad: result
    };
  }
};
