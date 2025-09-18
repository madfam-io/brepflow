
import { NodeDefinition } from '@brepflow/types';

interface Params {
  thickness: number;
  height: number;
  draftAngle: number;
  topRadius: number;
}
interface Inputs {
  face: Face;
  path: Curve;
}
interface Outputs {
  shape: Shape;
}

export const LinearRibNode: NodeDefinition<LinearRibInputs, LinearRibOutputs, LinearRibParams> = {
  type: 'Features::LinearRib',
  category: 'Features',
  subcategory: 'Structural',

  metadata: {
    label: 'LinearRib',
    description: 'Creates a reinforcing rib along a path',
    
    tags: ["rib","reinforcement","structural"],
  },

  params: {
        thickness: {
      "default": 3,
      "min": 0.1,
      "max": 100
    },
    height: {
      "default": 20,
      "min": 0.1,
      "max": 1000
    },
    draftAngle: {
      "default": 1,
      "min": 0,
      "max": 10,
      "description": "Draft angle for molding"
    },
    topRadius: {
      "default": 1,
      "min": 0,
      "max": 50,
      "description": "Top edge fillet radius"
    }
  },

  inputs: {
        face: 'Face',
    path: 'Curve'
  },

  outputs: {
        shape: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    // TODO: Implement LinearRib logic
    throw new Error('LinearRib not yet implemented');
  }
};
