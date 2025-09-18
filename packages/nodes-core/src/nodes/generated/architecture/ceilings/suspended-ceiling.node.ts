
import { NodeDefinition } from '@brepflow/types';

interface Params {
  tileSize: string;
  suspensionHeight: number;
}
interface Inputs {
  roomBoundary: Wire;
}
interface Outputs {
  ceiling: Shape;
  grid: Wire[];
  tiles: Face[];
}

export const SuspendedCeilingNode: NodeDefinition<SuspendedCeilingInputs, SuspendedCeilingOutputs, SuspendedCeilingParams> = {
  type: 'Architecture::SuspendedCeiling',
  category: 'Architecture',
  subcategory: 'Ceilings',

  metadata: {
    label: 'SuspendedCeiling',
    description: 'Suspended ceiling grid',
    
    
  },

  params: {
        tileSize: {
      "default": "600x600",
      "options": [
        "600x600",
        "600x1200",
        "1200x1200"
      ]
    },
    suspensionHeight: {
      "default": 300,
      "min": 150,
      "max": 1000
    }
  },

  inputs: {
        roomBoundary: 'Wire'
  },

  outputs: {
        ceiling: 'Shape',
    grid: 'Wire[]',
    tiles: 'Face[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'suspendedCeiling',
      params: {
        roomBoundary: inputs.roomBoundary,
        tileSize: params.tileSize,
        suspensionHeight: params.suspensionHeight
      }
    });

    return {
      ceiling: result,
      grid: result,
      tiles: result
    };
  }
};
