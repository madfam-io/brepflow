
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  matrix: Matrix;
}
interface Outputs {
  transpose: Matrix;
}

export const MatrixTransposeNode: NodeDefinition<MatrixTransposeInputs, MatrixTransposeOutputs, MatrixTransposeParams> = {
  type: 'Math::MatrixTranspose',
  category: 'Math',
  subcategory: 'Matrix',

  metadata: {
    label: 'MatrixTranspose',
    description: 'Matrix transpose',
    
    
  },

  params: {
    
  },

  inputs: {
        matrix: 'Matrix'
  },

  outputs: {
        transpose: 'Matrix'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathMatrixTranspose',
      params: {
        matrix: inputs.matrix
        
      }
    });

    return {
      transpose: result
    };
  }
};
