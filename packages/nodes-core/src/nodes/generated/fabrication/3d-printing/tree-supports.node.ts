
import { NodeDefinition } from '@brepflow/types';

interface Params {
  branchAngle: number;
  trunkDiameter: number;
  branchDiameter: number;
}
interface Inputs {
  model: Shape;
}
interface Outputs {
  treeSupports: Shape;
}

export const TreeSupportsNode: NodeDefinition<TreeSupportsInputs, TreeSupportsOutputs, TreeSupportsParams> = {
  type: 'Fabrication::TreeSupports',
  category: 'Fabrication',
  subcategory: '3D Printing',

  metadata: {
    label: 'TreeSupports',
    description: 'Generate tree-like supports',
    
    
  },

  params: {
        branchAngle: {
      "default": 40,
      "min": 20,
      "max": 60
    },
    trunkDiameter: {
      "default": 5,
      "min": 1,
      "max": 20
    },
    branchDiameter: {
      "default": 2,
      "min": 0.5,
      "max": 10
    }
  },

  inputs: {
        model: 'Shape'
  },

  outputs: {
        treeSupports: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'treeSupports',
      params: {
        model: inputs.model,
        branchAngle: params.branchAngle,
        trunkDiameter: params.trunkDiameter,
        branchDiameter: params.branchDiameter
      }
    });

    return {
      treeSupports: result
    };
  }
};
