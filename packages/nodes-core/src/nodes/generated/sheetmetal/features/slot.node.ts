
import { NodeDefinition } from '@brepflow/types';

interface Params {
  slotWidth: number;
  slotDepth: number;
  clearance: number;
}
interface Inputs {
  sheet: Shape;
  edge: Edge;
  position: Point;
}
interface Outputs {
  result: Shape;
}

export const SlotNode: NodeDefinition<SlotInputs, SlotOutputs, SlotParams> = {
  type: 'SheetMetal::Slot',
  category: 'SheetMetal',
  subcategory: 'Features',

  metadata: {
    label: 'Slot',
    description: 'Create slot for tab',
    
    
  },

  params: {
        slotWidth: {
      "default": 20,
      "min": 0.1,
      "max": 500
    },
    slotDepth: {
      "default": 10,
      "min": 0.1,
      "max": 100
    },
    clearance: {
      "default": 0.2,
      "min": 0,
      "max": 5
    }
  },

  inputs: {
        sheet: 'Shape',
    edge: 'Edge',
    position: 'Point'
  },

  outputs: {
        result: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'sheetSlot',
      params: {
        sheet: inputs.sheet,
        edge: inputs.edge,
        position: inputs.position,
        slotWidth: params.slotWidth,
        slotDepth: params.slotDepth,
        clearance: params.clearance
      }
    });

    return {
      result: result
    };
  }
};
