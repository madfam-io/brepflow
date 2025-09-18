
import { NodeDefinition } from '@brepflow/types';

interface Params {
  thickness: number;
  material: string;
  kFactor: number;
  minBendRadius: number;
  reliefType: string;
}
type Inputs = {};
interface Outputs {
  style: Data;
}

export const SheetMetalStyleNode: NodeDefinition<SheetMetalStyleInputs, SheetMetalStyleOutputs, SheetMetalStyleParams> = {
  type: 'SheetMetal::SheetMetalStyle',
  category: 'SheetMetal',
  subcategory: 'Properties',

  metadata: {
    label: 'SheetMetalStyle',
    description: 'Define sheet metal parameters',
    
    
  },

  params: {
        thickness: {
      "default": 2,
      "min": 0.1,
      "max": 50,
      "description": "Material thickness"
    },
    material: {
      "default": "steel",
      "options": [
        "steel",
        "aluminum",
        "stainless",
        "copper",
        "brass"
      ]
    },
    kFactor: {
      "default": 0.44,
      "min": 0,
      "max": 1
    },
    minBendRadius: {
      "default": 2,
      "min": 0.1,
      "max": 50
    },
    reliefType: {
      "default": "rectangular",
      "options": [
        "rectangular",
        "obround",
        "tear"
      ]
    }
  },

  inputs: {
    
  },

  outputs: {
        style: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'sheetStyle',
      params: {
        
        thickness: params.thickness,
        material: params.material,
        kFactor: params.kFactor,
        minBendRadius: params.minBendRadius,
        reliefType: params.reliefType
      }
    });

    return {
      style: result
    };
  }
};
