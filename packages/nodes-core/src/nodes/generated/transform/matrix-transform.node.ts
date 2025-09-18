
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  shape: Shape;
  matrix: Matrix4x4;
}
interface Outputs {
  transformed: Shape;
}

export const MatrixTransformNode: NodeDefinition<MatrixTransformInputs, MatrixTransformOutputs, MatrixTransformParams> = {
  type: 'Transform::MatrixTransform',
  category: 'Transform',
  

  metadata: {
    label: 'MatrixTransform',
    description: 'Apply transformation matrix',
    
    
  },

  params: {
    
  },

  inputs: {
        shape: 'Shape',
    matrix: 'Matrix4x4'
  },

  outputs: {
        transformed: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'transformMatrix',
      params: {
        shape: inputs.shape,
        matrix: inputs.matrix
        
      }
    });

    return {
      transformed: result
    };
  }
};
