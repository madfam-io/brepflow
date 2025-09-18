
import { NodeDefinition } from '@brepflow/types';

interface Params {
  bendAngle: number;
  bendRadius: number;
  accuracy: number;
}
interface Inputs {
  solid: Shape;
  bendPlane: Plane;
  trimPlanes?: Plane[];
}
interface Outputs {
  flexed: Shape;
}

export const FlexNode: NodeDefinition<FlexInputs, FlexOutputs, FlexParams> = {
  type: 'Advanced::Flex',
  category: 'Advanced',
  subcategory: 'Features',

  metadata: {
    label: 'Flex',
    description: 'Flex solid for living hinges',
    
    
  },

  params: {
        bendAngle: {
      "default": 90,
      "min": 0,
      "max": 180
    },
    bendRadius: {
      "default": 10,
      "min": 0.1,
      "max": 1000
    },
    accuracy: {
      "default": 1,
      "min": 0.1,
      "max": 10
    }
  },

  inputs: {
        solid: 'Shape',
    bendPlane: 'Plane',
    trimPlanes: 'Plane[]'
  },

  outputs: {
        flexed: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'flex',
      params: {
        solid: inputs.solid,
        bendPlane: inputs.bendPlane,
        trimPlanes: inputs.trimPlanes,
        bendAngle: params.bendAngle,
        bendRadius: params.bendRadius,
        accuracy: params.accuracy
      }
    });

    return {
      flexed: result
    };
  }
};
