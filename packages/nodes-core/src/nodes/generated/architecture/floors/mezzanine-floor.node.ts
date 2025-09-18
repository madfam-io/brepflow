
import { NodeDefinition } from '@brepflow/types';

interface Params {
  structureType: string;
  clearHeight: number;
}
interface Inputs {
  mezzanineOutline: Wire;
}
interface Outputs {
  mezzanine: Shape;
  structure: Shape[];
}

export const MezzanineFloorNode: NodeDefinition<MezzanineFloorInputs, MezzanineFloorOutputs, MezzanineFloorParams> = {
  type: 'Architecture::MezzanineFloor',
  category: 'Architecture',
  subcategory: 'Floors',

  metadata: {
    label: 'MezzanineFloor',
    description: 'Mezzanine floor structure',
    
    
  },

  params: {
        structureType: {
      "default": "steel",
      "options": [
        "steel",
        "concrete",
        "wood"
      ]
    },
    clearHeight: {
      "default": 2400,
      "min": 2100,
      "max": 3000
    }
  },

  inputs: {
        mezzanineOutline: 'Wire'
  },

  outputs: {
        mezzanine: 'Shape',
    structure: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mezzanineFloor',
      params: {
        mezzanineOutline: inputs.mezzanineOutline,
        structureType: params.structureType,
        clearHeight: params.clearHeight
      }
    });

    return {
      mezzanine: result,
      structure: result
    };
  }
};
