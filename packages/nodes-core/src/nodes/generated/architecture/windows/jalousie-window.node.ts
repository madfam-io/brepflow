
import { NodeDefinition } from '@brepflow/types';

interface Params {
  slats: number;
  angle: number;
}
interface Inputs {
  opening: Wire;
}
interface Outputs {
  jalousie: Shape;
  slats: Shape[];
}

export const JalousieWindowNode: NodeDefinition<JalousieWindowInputs, JalousieWindowOutputs, JalousieWindowParams> = {
  type: 'Architecture::JalousieWindow',
  category: 'Architecture',
  subcategory: 'Windows',

  metadata: {
    label: 'JalousieWindow',
    description: 'Jalousie louvre window',
    
    
  },

  params: {
        slats: {
      "default": 10,
      "min": 5,
      "max": 20,
      "step": 1
    },
    angle: {
      "default": 0,
      "min": 0,
      "max": 90
    }
  },

  inputs: {
        opening: 'Wire'
  },

  outputs: {
        jalousie: 'Shape',
    slats: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'jalousieWindow',
      params: {
        opening: inputs.opening,
        slats: params.slats,
        angle: params.angle
      }
    });

    return {
      jalousie: result,
      slats: result
    };
  }
};
