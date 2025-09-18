
import { NodeDefinition } from '@brepflow/types';

interface Params {
  threshold: number;
  showConnections: boolean;
}
interface Inputs {
  objects: Shape[];
}
interface Outputs {
  proximityPairs: Shape[][];
  distances: number[];
  connections: Wire[];
}

export const ProximityAnalysisNode: NodeDefinition<ProximityAnalysisInputs, ProximityAnalysisOutputs, ProximityAnalysisParams> = {
  type: 'Analysis::ProximityAnalysis',
  category: 'Analysis',
  subcategory: 'Proximity',

  metadata: {
    label: 'ProximityAnalysis',
    description: 'Analyze proximity between multiple objects',
    
    
  },

  params: {
        threshold: {
      "default": 1,
      "min": 0.1,
      "max": 100
    },
    showConnections: {
      "default": true
    }
  },

  inputs: {
        objects: 'Shape[]'
  },

  outputs: {
        proximityPairs: 'Shape[][]',
    distances: 'number[]',
    connections: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'proximityAnalysis',
      params: {
        objects: inputs.objects,
        threshold: params.threshold,
        showConnections: params.showConnections
      }
    });

    return {
      proximityPairs: result,
      distances: result,
      connections: result
    };
  }
};
