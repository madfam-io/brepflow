
import { NodeDefinition } from '@brepflow/types';

interface Params {
  constraintType: string;
  dof: any;
}
interface Inputs {
  mesh: Mesh;
  constraintFaces: Face[];
}
interface Outputs {
  constrainedMesh: Mesh;
  constraintData: Data;
}

export const ApplyConstraintsNode: NodeDefinition<ApplyConstraintsInputs, ApplyConstraintsOutputs, ApplyConstraintsParams> = {
  type: 'Simulation::ApplyConstraints',
  category: 'Simulation',
  subcategory: 'FEA',

  metadata: {
    label: 'ApplyConstraints',
    description: 'Define boundary conditions',
    
    
  },

  params: {
        constraintType: {
      "default": "fixed",
      "options": [
        "fixed",
        "pinned",
        "roller",
        "spring",
        "displacement"
      ]
    },
    dof: {
      "default": [
        true,
        true,
        true,
        true,
        true,
        true
      ],
      "description": "X,Y,Z,RX,RY,RZ"
    }
  },

  inputs: {
        mesh: 'Mesh',
    constraintFaces: 'Face[]'
  },

  outputs: {
        constrainedMesh: 'Mesh',
    constraintData: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'applyConstraints',
      params: {
        mesh: inputs.mesh,
        constraintFaces: inputs.constraintFaces,
        constraintType: params.constraintType,
        dof: params.dof
      }
    });

    return {
      constrainedMesh: result,
      constraintData: result
    };
  }
};
