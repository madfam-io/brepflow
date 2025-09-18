
import { NodeDefinition } from '@brepflow/types';

interface Params {
  diameter: string;
  length: number;
  threadPitch: number;
  headHeight: number;
}
interface Inputs {
  position: Point;
  direction?: Vector;
}
interface Outputs {
  bolt: Shape;
  thread: Wire;
}

export const HexBoltNode: NodeDefinition<HexBoltInputs, HexBoltOutputs, HexBoltParams> = {
  type: 'MechanicalEngineering::HexBolt',
  category: 'MechanicalEngineering',
  subcategory: 'Fasteners',

  metadata: {
    label: 'HexBolt',
    description: 'Create hex head bolt',
    
    
  },

  params: {
        diameter: {
      "default": "M6",
      "options": [
        "M3",
        "M4",
        "M5",
        "M6",
        "M8",
        "M10",
        "M12",
        "M16",
        "M20"
      ]
    },
    length: {
      "default": 20,
      "min": 5,
      "max": 200,
      "description": "Length in mm"
    },
    threadPitch: {
      "default": 1,
      "min": 0.5,
      "max": 3,
      "step": 0.25
    },
    headHeight: {
      "default": 4,
      "min": 2,
      "max": 20
    }
  },

  inputs: {
        position: 'Point',
    direction: 'Vector'
  },

  outputs: {
        bolt: 'Shape',
    thread: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'hexBolt',
      params: {
        position: inputs.position,
        direction: inputs.direction,
        diameter: params.diameter,
        length: params.length,
        threadPitch: params.threadPitch,
        headHeight: params.headHeight
      }
    });

    return {
      bolt: result,
      thread: result
    };
  }
};
