
import { NodeDefinition } from '@brepflow/types';

interface Params {
  ratio: number;
  reverse: boolean;
}
interface Inputs {
  gear1: Shape;
  gear2: Shape;
}
interface Outputs {
  geared: Shape[];
  mate: Mate;
}

export const GearNode: NodeDefinition<GearInputs, GearOutputs, GearParams> = {
  type: 'Assembly::Gear',
  category: 'Assembly',
  subcategory: 'Mates',

  metadata: {
    label: 'Gear',
    description: 'Create gear relationship',
    
    
  },

  params: {
        ratio: {
      "default": 1,
      "min": 0.1,
      "max": 100
    },
    reverse: {
      "default": false
    }
  },

  inputs: {
        gear1: 'Shape',
    gear2: 'Shape'
  },

  outputs: {
        geared: 'Shape[]',
    mate: 'Mate'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mateGear',
      params: {
        gear1: inputs.gear1,
        gear2: inputs.gear2,
        ratio: params.ratio,
        reverse: params.reverse
      }
    });

    return {
      geared: result,
      mate: result
    };
  }
};
