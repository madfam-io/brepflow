
import { NodeDefinition } from '@brepflow/types';

interface Params {
  tolerance: number;
  fixSmallEdges: boolean;
  fixSmallFaces: boolean;
  sewFaces: boolean;
  makeManifold: boolean;
}
interface Inputs {
  shape: Shape;
}
interface Outputs {
  healed: Shape;
  report: Data;
}

export const HealShapeNode: NodeDefinition<HealShapeInputs, HealShapeOutputs, HealShapeParams> = {
  type: 'Advanced::HealShape',
  category: 'Advanced',
  subcategory: 'Healing',

  metadata: {
    label: 'HealShape',
    description: 'Repair geometric errors',
    
    
  },

  params: {
        tolerance: {
      "default": 0.01,
      "min": 0.0001,
      "max": 1
    },
    fixSmallEdges: {
      "default": true
    },
    fixSmallFaces: {
      "default": true
    },
    sewFaces: {
      "default": true
    },
    makeManifold: {
      "default": false
    }
  },

  inputs: {
        shape: 'Shape'
  },

  outputs: {
        healed: 'Shape',
    report: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'healShape',
      params: {
        shape: inputs.shape,
        tolerance: params.tolerance,
        fixSmallEdges: params.fixSmallEdges,
        fixSmallFaces: params.fixSmallFaces,
        sewFaces: params.sewFaces,
        makeManifold: params.makeManifold
      }
    });

    return {
      healed: result,
      report: result
    };
  }
};
