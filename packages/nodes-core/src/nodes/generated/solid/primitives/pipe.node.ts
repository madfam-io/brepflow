
import { NodeDefinition } from '@brepflow/types';

interface Params {
  outerRadius: number;
  innerRadius: number;
  height: number;
}
type Inputs = {};
interface Outputs {
  solid: Solid;
}

export const PipeNode: NodeDefinition<PipeInputs, PipeOutputs, PipeParams> = {
  type: 'Solid::Pipe',
  category: 'Solid',
  subcategory: 'Primitives',

  metadata: {
    label: 'Pipe',
    description: 'Create a pipe (hollow cylinder)',
    
    
  },

  params: {
        outerRadius: {
      "default": 50,
      "min": 0.1,
      "max": 10000
    },
    innerRadius: {
      "default": 40,
      "min": 0.1,
      "max": 10000
    },
    height: {
      "default": 100,
      "min": 0.1,
      "max": 10000
    }
  },

  inputs: {
    
  },

  outputs: {
        solid: 'Solid'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makePipe',
      params: {
        
        outerRadius: params.outerRadius,
        innerRadius: params.innerRadius,
        height: params.height
      }
    });

    return {
      solid: result
    };
  }
};
