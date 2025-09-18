
import { NodeDefinition } from '@brepflow/types';

interface Params {
  minThickness: number;
  maxThickness: number;
}
interface Inputs {
  model: Shape;
}
interface Outputs {
  analysis: Data;
  thinAreas: Face[];
}

export const WallThicknessNode: NodeDefinition<WallThicknessInputs, WallThicknessOutputs, WallThicknessParams> = {
  type: 'Fabrication::WallThickness',
  category: 'Fabrication',
  subcategory: '3D Printing',

  metadata: {
    label: 'WallThickness',
    description: 'Analyze wall thickness',
    
    
  },

  params: {
        minThickness: {
      "default": 1,
      "min": 0.1
    },
    maxThickness: {
      "default": 10,
      "min": 1
    }
  },

  inputs: {
        model: 'Shape'
  },

  outputs: {
        analysis: 'Data',
    thinAreas: 'Face[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'wallThickness',
      params: {
        model: inputs.model,
        minThickness: params.minThickness,
        maxThickness: params.maxThickness
      }
    });

    return {
      analysis: result,
      thinAreas: result
    };
  }
};
