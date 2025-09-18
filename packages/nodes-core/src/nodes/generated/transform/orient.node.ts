
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  shape: Shape;
  fromDirection: Vector;
  toDirection: Vector;
}
interface Outputs {
  oriented: Shape;
}

export const OrientNode: NodeDefinition<OrientInputs, OrientOutputs, OrientParams> = {
  type: 'Transform::Orient',
  category: 'Transform',
  

  metadata: {
    label: 'Orient',
    description: 'Orient shape to match reference orientation',
    
    
  },

  params: {
    
  },

  inputs: {
        shape: 'Shape',
    fromDirection: 'Vector',
    toDirection: 'Vector'
  },

  outputs: {
        oriented: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'transformOrient',
      params: {
        shape: inputs.shape,
        fromDirection: inputs.fromDirection,
        toDirection: inputs.toDirection
        
      }
    });

    return {
      oriented: result
    };
  }
};
