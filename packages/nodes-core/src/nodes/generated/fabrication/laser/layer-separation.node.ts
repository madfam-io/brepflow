
import { NodeDefinition } from '@brepflow/types';

interface Params {
  separateBy: string;
}
interface Inputs {
  drawing: Wire[];
}
interface Outputs {
  layers: Wire[][];
}

export const LayerSeparationNode: NodeDefinition<LayerSeparationInputs, LayerSeparationOutputs, LayerSeparationParams> = {
  type: 'Fabrication::LayerSeparation',
  category: 'Fabrication',
  subcategory: 'Laser',

  metadata: {
    label: 'LayerSeparation',
    description: 'Separate by layer/color',
    
    
  },

  params: {
        separateBy: {
      "default": "color",
      "options": [
        "color",
        "layer",
        "lineweight"
      ]
    }
  },

  inputs: {
        drawing: 'Wire[]'
  },

  outputs: {
        layers: 'Wire[][]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'layerSeparation',
      params: {
        drawing: inputs.drawing,
        separateBy: params.separateBy
      }
    });

    return {
      layers: result
    };
  }
};
