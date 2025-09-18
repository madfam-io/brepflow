
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  a: Matrix;
  b: Matrix;
}
interface Outputs {
  result: Matrix;
}

export const MatrixMultiplyNode: NodeDefinition<MatrixMultiplyInputs, MatrixMultiplyOutputs, MatrixMultiplyParams> = {
  type: 'Math::MatrixMultiply',
  category: 'Math',
  subcategory: 'Matrix',

  metadata: {
    label: 'MatrixMultiply',
    description: 'Matrix multiplication',
    
    
  },

  params: {
    
  },

  inputs: {
        a: 'Matrix',
    b: 'Matrix'
  },

  outputs: {
        result: 'Matrix'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathMatrixMultiply',
      params: {
        a: inputs.a,
        b: inputs.b
        
      }
    });

    return {
      result: result
    };
  }
};
