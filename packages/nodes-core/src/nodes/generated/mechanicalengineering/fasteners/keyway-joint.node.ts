
import { NodeDefinition } from '@brepflow/types';

interface Params {
  shaftDiameter: number;
  keyWidth: number;
  keyHeight: number;
  keyLength: number;
}
interface Inputs {
  shaftCenter: Point;
}
interface Outputs {
  shaft: Shape;
  key: Shape;
  keyway: Wire;
}

export const KeywayJointNode: NodeDefinition<KeywayJointInputs, KeywayJointOutputs, KeywayJointParams> = {
  type: 'MechanicalEngineering::KeywayJoint',
  category: 'MechanicalEngineering',
  subcategory: 'Fasteners',

  metadata: {
    label: 'KeywayJoint',
    description: 'Create keyway and key',
    
    
  },

  params: {
        shaftDiameter: {
      "default": 20,
      "min": 6,
      "max": 100
    },
    keyWidth: {
      "default": 6,
      "min": 2,
      "max": 30
    },
    keyHeight: {
      "default": 6,
      "min": 2,
      "max": 30
    },
    keyLength: {
      "default": 25,
      "min": 10,
      "max": 100
    }
  },

  inputs: {
        shaftCenter: 'Point'
  },

  outputs: {
        shaft: 'Shape',
    key: 'Shape',
    keyway: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'keywayJoint',
      params: {
        shaftCenter: inputs.shaftCenter,
        shaftDiameter: params.shaftDiameter,
        keyWidth: params.keyWidth,
        keyHeight: params.keyHeight,
        keyLength: params.keyLength
      }
    });

    return {
      shaft: result,
      key: result,
      keyway: result
    };
  }
};
