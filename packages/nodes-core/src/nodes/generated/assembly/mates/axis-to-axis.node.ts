
import { NodeDefinition } from '@brepflow/types';

interface Params {
  colinear: boolean;
  offset: number;
}
interface Inputs {
  axis1: Axis;
  axis2: Axis;
}
interface Outputs {
  mated: Shape[];
  mate: Mate;
}

export const AxisToAxisNode: NodeDefinition<AxisToAxisInputs, AxisToAxisOutputs, AxisToAxisParams> = {
  type: 'Assembly::AxisToAxis',
  category: 'Assembly',
  subcategory: 'Mates',

  metadata: {
    label: 'AxisToAxis',
    description: 'Align two axes',
    
    
  },

  params: {
        colinear: {
      "default": true
    },
    offset: {
      "default": 0
    }
  },

  inputs: {
        axis1: 'Axis',
    axis2: 'Axis'
  },

  outputs: {
        mated: 'Shape[]',
    mate: 'Mate'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mateAxisToAxis',
      params: {
        axis1: inputs.axis1,
        axis2: inputs.axis2,
        colinear: params.colinear,
        offset: params.offset
      }
    });

    return {
      mated: result,
      mate: result
    };
  }
};
