
import { NodeDefinition } from '@brepflow/types';

interface Params {
  layerHeight: number;
  infillDensity: number;
  infillPattern: string;
}
interface Inputs {
  model: Shape;
}
interface Outputs {
  slices: Wire[];
  infill: Wire[];
}

export const SliceModelNode: NodeDefinition<SliceModelInputs, SliceModelOutputs, SliceModelParams> = {
  type: 'Fabrication::SliceModel',
  category: 'Fabrication',
  subcategory: '3D Printing',

  metadata: {
    label: 'SliceModel',
    description: 'Slice model for printing',
    
    
  },

  params: {
        layerHeight: {
      "default": 0.2,
      "min": 0.05,
      "max": 1
    },
    infillDensity: {
      "default": 0.2,
      "min": 0,
      "max": 1
    },
    infillPattern: {
      "default": "grid",
      "options": [
        "grid",
        "honeycomb",
        "gyroid",
        "cubic"
      ]
    }
  },

  inputs: {
        model: 'Shape'
  },

  outputs: {
        slices: 'Wire[]',
    infill: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'sliceModel',
      params: {
        model: inputs.model,
        layerHeight: params.layerHeight,
        infillDensity: params.infillDensity,
        infillPattern: params.infillPattern
      }
    });

    return {
      slices: result,
      infill: result
    };
  }
};
