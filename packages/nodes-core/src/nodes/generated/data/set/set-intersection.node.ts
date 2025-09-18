
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  setA: Data[];
  setB: Data[];
}
interface Outputs {
  intersection: Data[];
}

export const SetIntersectionNode: NodeDefinition<SetIntersectionInputs, SetIntersectionOutputs, SetIntersectionParams> = {
  type: 'Data::SetIntersection',
  category: 'Data',
  subcategory: 'Set',

  metadata: {
    label: 'SetIntersection',
    description: 'Intersection of sets',
    
    
  },

  params: {
    
  },

  inputs: {
        setA: 'Data[]',
    setB: 'Data[]'
  },

  outputs: {
        intersection: 'Data[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'setIntersection',
      params: {
        setA: inputs.setA,
        setB: inputs.setB
        
      }
    });

    return {
      intersection: result
    };
  }
};
