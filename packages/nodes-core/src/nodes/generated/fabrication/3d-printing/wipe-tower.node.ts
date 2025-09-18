
import { NodeDefinition } from '@brepflow/types';

interface Params {
  towerWidth: number;
  wipeVolume: number;
}
interface Inputs {
  printHeight: Number;
}
interface Outputs {
  tower: Shape;
}

export const WipeTowerNode: NodeDefinition<WipeTowerInputs, WipeTowerOutputs, WipeTowerParams> = {
  type: 'Fabrication::WipeTower',
  category: 'Fabrication',
  subcategory: '3D Printing',

  metadata: {
    label: 'WipeTower',
    description: 'Generate wipe tower',
    
    
  },

  params: {
        towerWidth: {
      "default": 60,
      "min": 20,
      "max": 100
    },
    wipeVolume: {
      "default": 15,
      "min": 5,
      "max": 50
    }
  },

  inputs: {
        printHeight: 'Number'
  },

  outputs: {
        tower: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'wipeTower',
      params: {
        printHeight: inputs.printHeight,
        towerWidth: params.towerWidth,
        wipeVolume: params.wipeVolume
      }
    });

    return {
      tower: result
    };
  }
};
