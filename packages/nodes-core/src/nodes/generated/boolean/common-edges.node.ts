
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  shape1: Shape;
  shape2: Shape;
}
interface Outputs {
  edges: Edge[];
}

export const CommonEdgesNode: NodeDefinition<CommonEdgesInputs, CommonEdgesOutputs, CommonEdgesParams> = {
  type: 'Boolean::CommonEdges',
  category: 'Boolean',
  

  metadata: {
    label: 'CommonEdges',
    description: 'Extract common edges between shapes',
    
    
  },

  params: {
    
  },

  inputs: {
        shape1: 'Shape',
    shape2: 'Shape'
  },

  outputs: {
        edges: 'Edge[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'booleanCommonEdges',
      params: {
        shape1: inputs.shape1,
        shape2: inputs.shape2
        
      }
    });

    return {
      edges: result
    };
  }
};
