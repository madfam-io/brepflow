
import { NodeDefinition } from '@brepflow/types';

interface Params {
  height: number;
  continuous: boolean;
}
interface Inputs {
  wallTop: Wire;
}
interface Outputs {
  clerestory: Shape;
}

export const ClerestroyWindowNode: NodeDefinition<ClerestroyWindowInputs, ClerestroyWindowOutputs, ClerestroyWindowParams> = {
  type: 'Architecture::ClerestroyWindow',
  category: 'Architecture',
  subcategory: 'Windows',

  metadata: {
    label: 'ClerestroyWindow',
    description: 'Clerestory window band',
    
    
  },

  params: {
        height: {
      "default": 600,
      "min": 400,
      "max": 1200
    },
    continuous: {
      "default": true
    }
  },

  inputs: {
        wallTop: 'Wire'
  },

  outputs: {
        clerestory: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'clerestoryWindow',
      params: {
        wallTop: inputs.wallTop,
        height: params.height,
        continuous: params.continuous
      }
    });

    return {
      clerestory: result
    };
  }
};
