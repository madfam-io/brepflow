
import { NodeDefinition } from '@brepflow/types';

interface Params {
  pitch: string;
  teeth: number;
  width: number;
  flanges: boolean;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  pulley: Shape;
  pitchCircle: Wire;
}

export const TimingPulleyNode: NodeDefinition<TimingPulleyInputs, TimingPulleyOutputs, TimingPulleyParams> = {
  type: 'MechanicalEngineering::TimingPulley',
  category: 'MechanicalEngineering',
  subcategory: 'Gears',

  metadata: {
    label: 'TimingPulley',
    description: 'Create timing belt pulley',
    
    
  },

  params: {
        pitch: {
      "default": "GT2",
      "options": [
        "MXL",
        "XL",
        "L",
        "H",
        "T2.5",
        "T5",
        "T10",
        "GT2"
      ]
    },
    teeth: {
      "default": 20,
      "min": 10,
      "max": 100
    },
    width: {
      "default": 10,
      "min": 6,
      "max": 50
    },
    flanges: {
      "default": true
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        pulley: 'Shape',
    pitchCircle: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'timingPulley',
      params: {
        center: inputs.center,
        pitch: params.pitch,
        teeth: params.teeth,
        width: params.width,
        flanges: params.flanges
      }
    });

    return {
      pulley: result,
      pitchCircle: result
    };
  }
};
