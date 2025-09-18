
import { NodeDefinition } from '@brepflow/types';

interface Params {
  freeRotation: boolean;
}
interface Inputs {
  slot: Shape;
  slider: Shape;
}
interface Outputs {
  slotted: Shape[];
  mate: Mate;
}

export const SlotNode: NodeDefinition<SlotInputs, SlotOutputs, SlotParams> = {
  type: 'Assembly::Slot',
  category: 'Assembly',
  subcategory: 'Mates',

  metadata: {
    label: 'Slot',
    description: 'Create slot constraint',
    
    
  },

  params: {
        freeRotation: {
      "default": true
    }
  },

  inputs: {
        slot: 'Shape',
    slider: 'Shape'
  },

  outputs: {
        slotted: 'Shape[]',
    mate: 'Mate'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mateSlot',
      params: {
        slot: inputs.slot,
        slider: inputs.slider,
        freeRotation: params.freeRotation
      }
    });

    return {
      slotted: result,
      mate: result
    };
  }
};
