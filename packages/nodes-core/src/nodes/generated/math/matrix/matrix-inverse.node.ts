
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  matrix: Matrix;
}
interface Outputs {
  inverse: Matrix;
}

export const MatrixInverseNode: NodeDefinition<MatrixInverseInputs, MatrixInverseOutputs, MatrixInverseParams> = {
  type: 'Math::MatrixInverse',
  category: 'Math',
  subcategory: 'Matrix',

  metadata: {
    label: 'MatrixInverse',
    description: 'Matrix inverse',
    
    
  },

  params: {
    
  },

  inputs: {
        matrix: 'Matrix'
  },

  outputs: {
        inverse: 'Matrix'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathMatrixInverse',
      params: {
        matrix: inputs.matrix
        
      }
    });

    return {
      inverse: result
    };
  }
};
