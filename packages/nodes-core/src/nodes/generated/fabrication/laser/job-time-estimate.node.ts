
import { NodeDefinition } from '@brepflow/types';

interface Params {
  rapidSpeed: number;
}
interface Inputs {
  cuttingPaths: Wire[];
  engravingPaths?: Wire[];
}
interface Outputs {
  totalTime: Number;
  cuttingTime: Number;
  engravingTime: Number;
}

export const JobTimeEstimateNode: NodeDefinition<JobTimeEstimateInputs, JobTimeEstimateOutputs, JobTimeEstimateParams> = {
  type: 'Fabrication::JobTimeEstimate',
  category: 'Fabrication',
  subcategory: 'Laser',

  metadata: {
    label: 'JobTimeEstimate',
    description: 'Estimate job time',
    
    
  },

  params: {
        rapidSpeed: {
      "default": 500,
      "min": 100,
      "max": 1000
    }
  },

  inputs: {
        cuttingPaths: 'Wire[]',
    engravingPaths: 'Wire[]'
  },

  outputs: {
        totalTime: 'Number',
    cuttingTime: 'Number',
    engravingTime: 'Number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'jobTimeEstimate',
      params: {
        cuttingPaths: inputs.cuttingPaths,
        engravingPaths: inputs.engravingPaths,
        rapidSpeed: params.rapidSpeed
      }
    });

    return {
      totalTime: result,
      cuttingTime: result,
      engravingTime: result
    };
  }
};
