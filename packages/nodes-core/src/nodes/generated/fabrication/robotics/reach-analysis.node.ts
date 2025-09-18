
import { NodeDefinition } from '@brepflow/types';

interface Params {
  resolution: number;
}
interface Inputs {
  robotModel: Data;
  workspace: Box;
}
interface Outputs {
  reachableVolume: Shape;
  coverage: Number;
}

export const ReachAnalysisNode: NodeDefinition<ReachAnalysisInputs, ReachAnalysisOutputs, ReachAnalysisParams> = {
  type: 'Fabrication::ReachAnalysis',
  category: 'Fabrication',
  subcategory: 'Robotics',

  metadata: {
    label: 'ReachAnalysis',
    description: 'Analyze robot reach',
    
    
  },

  params: {
        resolution: {
      "default": 50,
      "min": 10,
      "max": 200,
      "step": 10
    }
  },

  inputs: {
        robotModel: 'Data',
    workspace: 'Box'
  },

  outputs: {
        reachableVolume: 'Shape',
    coverage: 'Number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'reachAnalysis',
      params: {
        robotModel: inputs.robotModel,
        workspace: inputs.workspace,
        resolution: params.resolution
      }
    });

    return {
      reachableVolume: result,
      coverage: result
    };
  }
};
