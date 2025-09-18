
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  matrix: Matrix;
}
interface Outputs {
  determinant: number;
}

export const MatrixDeterminantNode: NodeDefinition<MatrixDeterminantInputs, MatrixDeterminantOutputs, MatrixDeterminantParams> = {
  type: 'Math::MatrixDeterminant',
  category: 'Math',
  subcategory: 'Matrix',

  metadata: {
    label: 'MatrixDeterminant',
    description: 'Matrix determinant',
    
    
  },

  params: {
    
  },

  inputs: {
        matrix: 'Matrix'
  },

  outputs: {
        determinant: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathMatrixDeterminant',
      params: {
        matrix: inputs.matrix
        
      }
    });

    return {
      determinant: result
    };
  }
};
