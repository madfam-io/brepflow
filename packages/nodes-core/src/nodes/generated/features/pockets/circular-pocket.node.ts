
import { NodeDefinition } from '@brepflow/types';

interface Params {
  diameter: number;
  depth: number;
  draftAngle: number;
}
interface Inputs {
  face: Face;
  position: Point;
}
interface Outputs {
  shape: Shape;
}

export const CircularPocketNode: NodeDefinition<CircularPocketInputs, CircularPocketOutputs, CircularPocketParams> = {
  type: 'Features::CircularPocket',
  category: 'Features',
  subcategory: 'Pockets',

  metadata: {
    label: 'CircularPocket',
    description: 'Creates a circular pocket',
    
    tags: ["pocket","cavity","milling"],
  },

  params: {
        diameter: {
      "default": 40,
      "min": 0.1,
      "max": 10000
    },
    depth: {
      "default": 10,
      "min": 0.1,
      "max": 1000
    },
    draftAngle: {
      "default": 0,
      "min": 0,
      "max": 45
    }
  },

  inputs: {
        face: 'Face',
    position: 'Point'
  },

  outputs: {
        shape: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    // TODO: Implement CircularPocket logic
    throw new Error('CircularPocket not yet implemented');
  }
};
