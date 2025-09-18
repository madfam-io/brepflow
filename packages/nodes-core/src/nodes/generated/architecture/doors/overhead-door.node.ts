
import { NodeDefinition } from '@brepflow/types';

interface Params {
  sections: number;
  trackType: string;
}
interface Inputs {
  opening: Wire;
}
interface Outputs {
  overheadDoor: Shape;
  tracks: Wire[];
}

export const OverheadDoorNode: NodeDefinition<OverheadDoorInputs, OverheadDoorOutputs, OverheadDoorParams> = {
  type: 'Architecture::OverheadDoor',
  category: 'Architecture',
  subcategory: 'Doors',

  metadata: {
    label: 'OverheadDoor',
    description: 'Overhead sectional door',
    
    
  },

  params: {
        sections: {
      "default": 4,
      "min": 3,
      "max": 6,
      "step": 1
    },
    trackType: {
      "default": "standard",
      "options": [
        "standard",
        "low-headroom",
        "high-lift"
      ]
    }
  },

  inputs: {
        opening: 'Wire'
  },

  outputs: {
        overheadDoor: 'Shape',
    tracks: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'overheadDoor',
      params: {
        opening: inputs.opening,
        sections: params.sections,
        trackType: params.trackType
      }
    });

    return {
      overheadDoor: result,
      tracks: result
    };
  }
};
