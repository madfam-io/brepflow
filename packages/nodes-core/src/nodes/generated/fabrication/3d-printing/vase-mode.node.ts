
import { NodeDefinition } from '@brepflow/types';

interface Params {
  bottomLayers: number;
}
interface Inputs {
  model: Shape;
}
interface Outputs {
  spiralPath: Wire;
}

export const VaseModeNode: NodeDefinition<VaseModeInputs, VaseModeOutputs, VaseModeParams> = {
  type: 'Fabrication::VaseMode',
  category: 'Fabrication',
  subcategory: '3D Printing',

  metadata: {
    label: 'VaseMode',
    description: 'Generate vase mode spiral',
    
    
  },

  params: {
        bottomLayers: {
      "default": 3,
      "min": 0,
      "max": 10,
      "step": 1
    }
  },

  inputs: {
        model: 'Shape'
  },

  outputs: {
        spiralPath: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'vaseMode',
      params: {
        model: inputs.model,
        bottomLayers: params.bottomLayers
      }
    });

    return {
      spiralPath: result
    };
  }
};
