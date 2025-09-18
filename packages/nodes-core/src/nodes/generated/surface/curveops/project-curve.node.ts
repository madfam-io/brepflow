
import { NodeDefinition } from '@brepflow/types';

interface Params {
  projectionDirection: [number, number, number];
  projectBoth: boolean;
}
interface Inputs {
  curve: Wire;
  surface: Face;
}
interface Outputs {
  projectedCurve: Wire;
}

export const ProjectCurveNode: NodeDefinition<ProjectCurveInputs, ProjectCurveOutputs, ProjectCurveParams> = {
  type: 'Surface::ProjectCurve',
  category: 'Surface',
  subcategory: 'CurveOps',

  metadata: {
    label: 'ProjectCurve',
    description: 'Project curve onto surface',
    
    
  },

  params: {
        projectionDirection: {
      "default": [
        0,
        0,
        -1
      ]
    },
    projectBoth: {
      "default": false
    }
  },

  inputs: {
        curve: 'Wire',
    surface: 'Face'
  },

  outputs: {
        projectedCurve: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'projectCurve',
      params: {
        curve: inputs.curve,
        surface: inputs.surface,
        projectionDirection: params.projectionDirection,
        projectBoth: params.projectBoth
      }
    });

    return {
      projectedCurve: result
    };
  }
};
