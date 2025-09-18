
import { NodeDefinition } from '@brepflow/types';

interface Params {
  jointWidth: number;
  jointSpacing: number;
}
interface Inputs {
  cutPath: Wire;
}
interface Outputs {
  jointedPath: Wire[];
}

export const MicroJointsNode: NodeDefinition<MicroJointsInputs, MicroJointsOutputs, MicroJointsParams> = {
  type: 'Fabrication::MicroJoints',
  category: 'Fabrication',
  subcategory: 'Laser',

  metadata: {
    label: 'MicroJoints',
    description: 'Add micro-joints',
    
    
  },

  params: {
        jointWidth: {
      "default": 0.2,
      "min": 0.1,
      "max": 2
    },
    jointSpacing: {
      "default": 30,
      "min": 10,
      "max": 100
    }
  },

  inputs: {
        cutPath: 'Wire'
  },

  outputs: {
        jointedPath: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'microJoints',
      params: {
        cutPath: inputs.cutPath,
        jointWidth: params.jointWidth,
        jointSpacing: params.jointSpacing
      }
    });

    return {
      jointedPath: result
    };
  }
};
