
import { NodeDefinition } from '@brepflow/types';

interface Params {
  size: string;
  height: number;
  style: string;
}
interface Inputs {
  position: Point;
}
interface Outputs {
  nut: Shape;
  thread: Wire;
}

export const HexNutNode: NodeDefinition<HexNutInputs, HexNutOutputs, HexNutParams> = {
  type: 'MechanicalEngineering::HexNut',
  category: 'MechanicalEngineering',
  subcategory: 'Fasteners',

  metadata: {
    label: 'HexNut',
    description: 'Create hexagonal nut',
    
    
  },

  params: {
        size: {
      "default": "M6",
      "options": [
        "M3",
        "M4",
        "M5",
        "M6",
        "M8",
        "M10",
        "M12"
      ]
    },
    height: {
      "default": 5,
      "min": 2,
      "max": 20
    },
    style: {
      "default": "standard",
      "options": [
        "standard",
        "nylon-insert",
        "castle",
        "wing"
      ]
    }
  },

  inputs: {
        position: 'Point'
  },

  outputs: {
        nut: 'Shape',
    thread: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'hexNut',
      params: {
        position: inputs.position,
        size: params.size,
        height: params.height,
        style: params.style
      }
    });

    return {
      nut: result,
      thread: result
    };
  }
};
