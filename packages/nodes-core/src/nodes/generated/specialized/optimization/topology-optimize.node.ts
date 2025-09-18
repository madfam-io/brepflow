
import { NodeDefinition } from '@brepflow/types';

interface Params {
  volumeFraction: number;
  penaltyFactor: number;
  filterRadius: number;
  iterations: number;
}
interface Inputs {
  designSpace: Shape;
  loads: Data;
  constraints: Data;
}
interface Outputs {
  optimized: Shape;
  convergence: Data;
}

export const TopologyOptimizeNode: NodeDefinition<TopologyOptimizeInputs, TopologyOptimizeOutputs, TopologyOptimizeParams> = {
  type: 'Specialized::TopologyOptimize',
  category: 'Specialized',
  subcategory: 'Optimization',

  metadata: {
    label: 'TopologyOptimize',
    description: 'Topology optimization',
    
    
  },

  params: {
        volumeFraction: {
      "default": 0.3,
      "min": 0.1,
      "max": 0.9
    },
    penaltyFactor: {
      "default": 3,
      "min": 1,
      "max": 5
    },
    filterRadius: {
      "default": 2,
      "min": 0.5,
      "max": 10
    },
    iterations: {
      "default": 100,
      "min": 10,
      "max": 500,
      "step": 10
    }
  },

  inputs: {
        designSpace: 'Shape',
    loads: 'Data',
    constraints: 'Data'
  },

  outputs: {
        optimized: 'Shape',
    convergence: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'topologyOptimize',
      params: {
        designSpace: inputs.designSpace,
        loads: inputs.loads,
        constraints: inputs.constraints,
        volumeFraction: params.volumeFraction,
        penaltyFactor: params.penaltyFactor,
        filterRadius: params.filterRadius,
        iterations: params.iterations
      }
    });

    return {
      optimized: result,
      convergence: result
    };
  }
};
