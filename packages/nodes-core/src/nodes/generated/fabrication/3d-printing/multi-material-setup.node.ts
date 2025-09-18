
import { NodeDefinition } from '@brepflow/types';

interface Params {
  materials: number;
  purgeVolume: number;
}
interface Inputs {
  regions: Shape[];
}
interface Outputs {
  materialAssignment: Data;
  purgeBlock: Shape;
}

export const MultiMaterialSetupNode: NodeDefinition<MultiMaterialSetupInputs, MultiMaterialSetupOutputs, MultiMaterialSetupParams> = {
  type: 'Fabrication::MultiMaterialSetup',
  category: 'Fabrication',
  subcategory: '3D Printing',

  metadata: {
    label: 'MultiMaterialSetup',
    description: 'Setup multi-material regions',
    
    
  },

  params: {
        materials: {
      "default": 2,
      "min": 2,
      "max": 5,
      "step": 1
    },
    purgeVolume: {
      "default": 50,
      "min": 0,
      "max": 200
    }
  },

  inputs: {
        regions: 'Shape[]'
  },

  outputs: {
        materialAssignment: 'Data',
    purgeBlock: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'multiMaterialSetup',
      params: {
        regions: inputs.regions,
        materials: params.materials,
        purgeVolume: params.purgeVolume
      }
    });

    return {
      materialAssignment: result,
      purgeBlock: result
    };
  }
};
