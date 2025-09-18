
import { NodeDefinition } from '@brepflow/types';

interface Params {
  outerDiameter: number;
  innerDiameter: number;
  height: number;
  draftAngle: number;
}
interface Inputs {
  face: Face;
  position: Point;
}
interface Outputs {
  shape: Shape;
}

export const MountingBossNode: NodeDefinition<MountingBossInputs, MountingBossOutputs, MountingBossParams> = {
  type: 'Features::MountingBoss',
  category: 'Features',
  subcategory: 'Structural',

  metadata: {
    label: 'MountingBoss',
    description: 'Creates a mounting boss for screws',
    
    tags: ["boss","mounting","fastener"],
  },

  params: {
        outerDiameter: {
      "default": 12,
      "min": 1,
      "max": 200
    },
    innerDiameter: {
      "default": 5,
      "min": 0.1,
      "max": 190,
      "description": "Pilot hole diameter"
    },
    height: {
      "default": 10,
      "min": 0.1,
      "max": 1000
    },
    draftAngle: {
      "default": 1,
      "min": 0,
      "max": 10
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
    
    // TODO: Implement MountingBoss logic
    throw new Error('MountingBoss not yet implemented');
  }
};
