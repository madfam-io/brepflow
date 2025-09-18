
import { NodeDefinition } from '@brepflow/types';

interface Params {
  toolDiameter: number;
}
interface Inputs {
  toolpath: Wire;
  stock: Shape;
}
interface Outputs {
  engagementAngle: Number[];
}

export const CutterEngagementNode: NodeDefinition<CutterEngagementInputs, CutterEngagementOutputs, CutterEngagementParams> = {
  type: 'Fabrication::CutterEngagement',
  category: 'Fabrication',
  subcategory: 'CNC',

  metadata: {
    label: 'CutterEngagement',
    description: 'Analyze cutter engagement',
    
    
  },

  params: {
        toolDiameter: {
      "default": 10,
      "min": 1,
      "max": 50
    }
  },

  inputs: {
        toolpath: 'Wire',
    stock: 'Shape'
  },

  outputs: {
        engagementAngle: 'Number[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'cutterEngagement',
      params: {
        toolpath: inputs.toolpath,
        stock: inputs.stock,
        toolDiameter: params.toolDiameter
      }
    });

    return {
      engagementAngle: result
    };
  }
};
