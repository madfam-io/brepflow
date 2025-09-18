
import { NodeDefinition } from '@brepflow/types';

interface Params {
  holeDiameter: number;
  counterbore: number;
  cbDepth: number;
  holeDepth: number;
}
interface Inputs {
  solid: Shape;
  position: Point;
}
interface Outputs {
  shape: Shape;
}

export const CounterboreHoleNode: NodeDefinition<CounterboreHoleInputs, CounterboreHoleOutputs, CounterboreHoleParams> = {
  type: 'Features::CounterboreHole',
  category: 'Features',
  subcategory: 'Holes',

  metadata: {
    label: 'CounterboreHole',
    description: 'Creates a counterbore hole for socket head cap screws',
    
    tags: ["hole","counterbore","fastener","SHCS"],
  },

  params: {
        holeDiameter: {
      "default": 6.5,
      "min": 0.1,
      "max": 100,
      "description": "Through hole diameter"
    },
    counterbore: {
      "default": 11,
      "min": 0.1,
      "max": 200,
      "description": "Counterbore diameter"
    },
    cbDepth: {
      "default": 6,
      "min": 0.1,
      "max": 100,
      "description": "Counterbore depth"
    },
    holeDepth: {
      "default": -1,
      "min": -1,
      "description": "Total hole depth (-1 for through)"
    }
  },

  inputs: {
        solid: 'Shape',
    position: 'Point'
  },

  outputs: {
        shape: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makeCounterbore',
      params: {
        solid: inputs.solid,
        position: inputs.position,
        holeDiameter: params.holeDiameter,
        counterbore: params.counterbore,
        cbDepth: params.cbDepth,
        holeDepth: params.holeDepth
      }
    });

    return {
      shape: result
    };
  }
};
