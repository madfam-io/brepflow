
import { NodeDefinition } from '@brepflow/types';

interface Params {
  jointWidth: number;
  sealantDepth: number;
}
interface Inputs {
  jointPath: Wire;
}
interface Outputs {
  expansionJoint: Shape;
}

export const FloorExpansionJointNode: NodeDefinition<FloorExpansionJointInputs, FloorExpansionJointOutputs, FloorExpansionJointParams> = {
  type: 'Architecture::FloorExpansionJoint',
  category: 'Architecture',
  subcategory: 'Floors',

  metadata: {
    label: 'FloorExpansionJoint',
    description: 'Expansion joint detail',
    
    
  },

  params: {
        jointWidth: {
      "default": 25,
      "min": 10,
      "max": 100
    },
    sealantDepth: {
      "default": 10,
      "min": 5,
      "max": 25
    }
  },

  inputs: {
        jointPath: 'Wire'
  },

  outputs: {
        expansionJoint: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'floorExpansionJoint',
      params: {
        jointPath: inputs.jointPath,
        jointWidth: params.jointWidth,
        sealantDepth: params.sealantDepth
      }
    });

    return {
      expansionJoint: result
    };
  }
};
