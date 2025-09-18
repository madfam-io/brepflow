
import { NodeDefinition } from '@brepflow/types';

interface Params {
  panelCount: number;
  panelWidth: number;
  openingPercent: number;
}
interface Inputs {
  opening: Wire;
}
interface Outputs {
  panels: Shape[];
  track: Shape;
}

export const SlidingDoorNode: NodeDefinition<SlidingDoorInputs, SlidingDoorOutputs, SlidingDoorParams> = {
  type: 'Architecture::SlidingDoor',
  category: 'Architecture',
  subcategory: 'Doors',

  metadata: {
    label: 'SlidingDoor',
    description: 'Sliding door system',
    
    
  },

  params: {
        panelCount: {
      "default": 2,
      "min": 1,
      "max": 4,
      "step": 1
    },
    panelWidth: {
      "default": 900,
      "min": 600,
      "max": 1500
    },
    openingPercent: {
      "default": 0,
      "min": 0,
      "max": 100
    }
  },

  inputs: {
        opening: 'Wire'
  },

  outputs: {
        panels: 'Shape[]',
    track: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'slidingDoor',
      params: {
        opening: inputs.opening,
        panelCount: params.panelCount,
        panelWidth: params.panelWidth,
        openingPercent: params.openingPercent
      }
    });

    return {
      panels: result,
      track: result
    };
  }
};
