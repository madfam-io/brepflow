
import { NodeDefinition } from '@brepflow/types';

interface Params {
  slatHeight: number;
  openHeight: number;
}
interface Inputs {
  opening: Wire;
}
interface Outputs {
  rollupDoor: Shape;
  guides: Shape[];
}

export const RollupDoorNode: NodeDefinition<RollupDoorInputs, RollupDoorOutputs, RollupDoorParams> = {
  type: 'Architecture::RollupDoor',
  category: 'Architecture',
  subcategory: 'Doors',

  metadata: {
    label: 'RollupDoor',
    description: 'Roll-up garage door',
    
    
  },

  params: {
        slatHeight: {
      "default": 75,
      "min": 50,
      "max": 100
    },
    openHeight: {
      "default": 0,
      "min": 0,
      "max": 3000
    }
  },

  inputs: {
        opening: 'Wire'
  },

  outputs: {
        rollupDoor: 'Shape',
    guides: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'rollupDoor',
      params: {
        opening: inputs.opening,
        slatHeight: params.slatHeight,
        openHeight: params.openHeight
      }
    });

    return {
      rollupDoor: result,
      guides: result
    };
  }
};
