
import { NodeDefinition } from '@brepflow/types';

interface Params {
  diameter: number;
  depth: number;
}
interface Inputs {
  solid: Shape;
  position: Point;
  direction?: Vector;
}
interface Outputs {
  shape: Shape;
}

export const SimpleHoleNode: NodeDefinition<SimpleHoleInputs, SimpleHoleOutputs, SimpleHoleParams> = {
  type: 'Features::SimpleHole',
  category: 'Features',
  subcategory: 'Holes',

  metadata: {
    label: 'SimpleHole',
    description: 'Creates a simple through hole',
    
    tags: ["hole","drill","fastener"],
  },

  params: {
        diameter: {
      "default": 10,
      "min": 0.1,
      "max": 1000,
      "step": 0.1,
      "description": "Hole diameter in mm"
    },
    depth: {
      "default": -1,
      "min": -1,
      "description": "Hole depth (-1 for through hole)"
    }
  },

  inputs: {
        solid: 'Shape',
    position: 'Point',
    direction: 'Vector'
  },

  outputs: {
        shape: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makeHole',
      params: {
        solid: inputs.solid,
        position: inputs.position,
        direction: inputs.direction,
        diameter: params.diameter,
        depth: params.depth
      }
    });

    return {
      shape: result
    };
  }
};
