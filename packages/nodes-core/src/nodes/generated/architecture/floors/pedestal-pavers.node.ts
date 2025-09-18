
import { NodeDefinition } from '@brepflow/types';

interface Params {
  paverSize: number;
  pedestalHeight: number;
}
interface Inputs {
  area: Face;
}
interface Outputs {
  pavers: Face[];
  pedestals: Shape[];
}

export const PedestalPaversNode: NodeDefinition<PedestalPaversInputs, PedestalPaversOutputs, PedestalPaversParams> = {
  type: 'Architecture::PedestalPavers',
  category: 'Architecture',
  subcategory: 'Floors',

  metadata: {
    label: 'PedestalPavers',
    description: 'Pedestal paver system',
    
    
  },

  params: {
        paverSize: {
      "default": 600,
      "min": 300,
      "max": 900
    },
    pedestalHeight: {
      "default": 100,
      "min": 25,
      "max": 500
    }
  },

  inputs: {
        area: 'Face'
  },

  outputs: {
        pavers: 'Face[]',
    pedestals: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'pedestalPavers',
      params: {
        area: inputs.area,
        paverSize: params.paverSize,
        pedestalHeight: params.pedestalHeight
      }
    });

    return {
      pavers: result,
      pedestals: result
    };
  }
};
