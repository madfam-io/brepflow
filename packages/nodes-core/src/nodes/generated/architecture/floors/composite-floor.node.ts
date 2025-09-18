
import { NodeDefinition } from '@brepflow/types';

interface Params {
  deckType: string;
  concreteThickness: number;
}
interface Inputs {
  floorOutline: Wire;
  beams: Wire[];
}
interface Outputs {
  compositeFloor: Shape;
  deck: Shape;
}

export const CompositeFloorNode: NodeDefinition<CompositeFloorInputs, CompositeFloorOutputs, CompositeFloorParams> = {
  type: 'Architecture::CompositeFloor',
  category: 'Architecture',
  subcategory: 'Floors',

  metadata: {
    label: 'CompositeFloor',
    description: 'Steel deck composite floor',
    
    
  },

  params: {
        deckType: {
      "default": "3-inch",
      "options": [
        "2-inch",
        "3-inch",
        "cellular"
      ]
    },
    concreteThickness: {
      "default": 100,
      "min": 75,
      "max": 200
    }
  },

  inputs: {
        floorOutline: 'Wire',
    beams: 'Wire[]'
  },

  outputs: {
        compositeFloor: 'Shape',
    deck: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'compositeFloor',
      params: {
        floorOutline: inputs.floorOutline,
        beams: inputs.beams,
        deckType: params.deckType,
        concreteThickness: params.concreteThickness
      }
    });

    return {
      compositeFloor: result,
      deck: result
    };
  }
};
