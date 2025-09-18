
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  value: number;
  fromMin: number;
  fromMax: number;
  toMin: number;
  toMax: number;
}
interface Outputs {
  remapped: number;
}

export const RemapNode: NodeDefinition<RemapInputs, RemapOutputs, RemapParams> = {
  type: 'Math::Remap',
  category: 'Math',
  subcategory: 'Interpolation',

  metadata: {
    label: 'Remap',
    description: 'Remap value to new range',
    
    
  },

  params: {
    
  },

  inputs: {
        value: 'number',
    fromMin: 'number',
    fromMax: 'number',
    toMin: 'number',
    toMax: 'number'
  },

  outputs: {
        remapped: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathRemap',
      params: {
        value: inputs.value,
        fromMin: inputs.fromMin,
        fromMax: inputs.fromMax,
        toMin: inputs.toMin,
        toMax: inputs.toMax
        
      }
    });

    return {
      remapped: result
    };
  }
};
