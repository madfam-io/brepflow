
import { NodeDefinition } from '@brepflow/types';

interface Params {
  opening: number;
}
interface Inputs {
  opening: Wire;
}
interface Outputs {
  window: Shape;
}

export const AwningWindowNode: NodeDefinition<AwningWindowInputs, AwningWindowOutputs, AwningWindowParams> = {
  type: 'Architecture::AwningWindow',
  category: 'Architecture',
  subcategory: 'Windows',

  metadata: {
    label: 'AwningWindow',
    description: 'Awning window',
    
    
  },

  params: {
        opening: {
      "default": 0,
      "min": 0,
      "max": 45
    }
  },

  inputs: {
        opening: 'Wire'
  },

  outputs: {
        window: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'awningWindow',
      params: {
        openingWire: inputs.opening,
        opening: params.opening
      }
    });

    return {
      window: result
    };
  }
};
