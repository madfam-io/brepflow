
import { NodeDefinition } from '@brepflow/types';

interface Params {
  perimeters: number;
  extrusionWidth: number;
}
interface Inputs {
  slice: Wire;
}
interface Outputs {
  perimeters: Wire[];
}

export const PerimeterGeneratorNode: NodeDefinition<PerimeterGeneratorInputs, PerimeterGeneratorOutputs, PerimeterGeneratorParams> = {
  type: 'Fabrication::PerimeterGenerator',
  category: 'Fabrication',
  subcategory: '3D Printing',

  metadata: {
    label: 'PerimeterGenerator',
    description: 'Generate perimeter paths',
    
    
  },

  params: {
        perimeters: {
      "default": 3,
      "min": 1,
      "max": 10,
      "step": 1
    },
    extrusionWidth: {
      "default": 0.4,
      "min": 0.1,
      "max": 2
    }
  },

  inputs: {
        slice: 'Wire'
  },

  outputs: {
        perimeters: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'perimeterGenerator',
      params: {
        slice: inputs.slice,
        perimeters: params.perimeters,
        extrusionWidth: params.extrusionWidth
      }
    });

    return {
      perimeters: result
    };
  }
};
