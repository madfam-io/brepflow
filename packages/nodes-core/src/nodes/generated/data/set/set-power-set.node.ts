
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  set: Data[];
}
interface Outputs {
  powerSet: Data[][];
}

export const SetPowerSetNode: NodeDefinition<SetPowerSetInputs, SetPowerSetOutputs, SetPowerSetParams> = {
  type: 'Data::SetPowerSet',
  category: 'Data',
  subcategory: 'Set',

  metadata: {
    label: 'SetPowerSet',
    description: 'Power set',
    
    
  },

  params: {
    
  },

  inputs: {
        set: 'Data[]'
  },

  outputs: {
        powerSet: 'Data[][]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'setPowerSet',
      params: {
        set: inputs.set
        
      }
    });

    return {
      powerSet: result
    };
  }
};
