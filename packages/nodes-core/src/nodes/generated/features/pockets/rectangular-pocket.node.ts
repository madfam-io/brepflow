
import { NodeDefinition } from '@brepflow/types';

interface Params {
  width: number;
  height: number;
  depth: number;
  cornerRadius: number;
  draftAngle: number;
}
interface Inputs {
  face: Face;
  position: Point;
}
interface Outputs {
  shape: Shape;
}

export const RectangularPocketNode: NodeDefinition<RectangularPocketInputs, RectangularPocketOutputs, RectangularPocketParams> = {
  type: 'Features::RectangularPocket',
  category: 'Features',
  subcategory: 'Pockets',

  metadata: {
    label: 'RectangularPocket',
    description: 'Creates a rectangular pocket with optional corner radius',
    
    tags: ["pocket","cavity","milling"],
  },

  params: {
        width: {
      "default": 50,
      "min": 0.1,
      "max": 10000
    },
    height: {
      "default": 30,
      "min": 0.1,
      "max": 10000
    },
    depth: {
      "default": 10,
      "min": 0.1,
      "max": 1000
    },
    cornerRadius: {
      "default": 0,
      "min": 0,
      "max": 100,
      "description": "Corner radius (0 for sharp corners)"
    },
    draftAngle: {
      "default": 0,
      "min": 0,
      "max": 45,
      "description": "Draft angle for molding"
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
    
    // TODO: Implement RectangularPocket logic
    throw new Error('RectangularPocket not yet implemented');
  }
};
