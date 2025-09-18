
import { NodeDefinition } from '@brepflow/types';

interface Params {
  densityElements: number;
  volumeFraction: number;
  penalization: number;
  filter: boolean;
}
interface Inputs {
  designDomain: Shape;
  loads: Properties[];
  supports: Properties[];
}
interface Outputs {
  optimizedShape: Shape;
  densityField: Properties;
  compliance: number;
}

export const TopologyOptimizerNode: NodeDefinition<TopologyOptimizerInputs, TopologyOptimizerOutputs, TopologyOptimizerParams> = {
  type: 'Algorithmic::TopologyOptimizer',
  category: 'Algorithmic',
  subcategory: 'Optimization',

  metadata: {
    label: 'TopologyOptimizer',
    description: 'Topology optimization for structures',
    
    
  },

  params: {
        densityElements: {
      "default": 100,
      "min": 10,
      "max": 1000
    },
    volumeFraction: {
      "default": 0.5,
      "min": 0.1,
      "max": 0.9
    },
    penalization: {
      "default": 3,
      "min": 1,
      "max": 5
    },
    filter: {
      "default": true
    }
  },

  inputs: {
        designDomain: 'Shape',
    loads: 'Properties[]',
    supports: 'Properties[]'
  },

  outputs: {
        optimizedShape: 'Shape',
    densityField: 'Properties',
    compliance: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'topologyOptimizer',
      params: {
        designDomain: inputs.designDomain,
        loads: inputs.loads,
        supports: inputs.supports,
        densityElements: params.densityElements,
        volumeFraction: params.volumeFraction,
        penalization: params.penalization,
        filter: params.filter
      }
    });

    return {
      optimizedShape: result,
      densityField: result,
      compliance: result
    };
  }
};
