
import { NodeDefinition } from '@brepflow/types';

interface Params {
  scheme: string;
  levels: number;
}
interface Inputs {
  controlMesh: Shape;
}
interface Outputs {
  subdivided: Shape;
}

export const SubdivisionSurfaceNode: NodeDefinition<SubdivisionSurfaceInputs, SubdivisionSurfaceOutputs, SubdivisionSurfaceParams> = {
  type: 'Specialized::SubdivisionSurface',
  category: 'Specialized',
  subcategory: 'Organic',

  metadata: {
    label: 'SubdivisionSurface',
    description: 'Subdivision surface modeling',
    
    
  },

  params: {
        scheme: {
      "default": "catmull-clark",
      "options": [
        "catmull-clark",
        "loop",
        "doo-sabin"
      ]
    },
    levels: {
      "default": 2,
      "min": 1,
      "max": 5,
      "step": 1
    }
  },

  inputs: {
        controlMesh: 'Shape'
  },

  outputs: {
        subdivided: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'subdivisionSurface',
      params: {
        controlMesh: inputs.controlMesh,
        scheme: params.scheme,
        levels: params.levels
      }
    });

    return {
      subdivided: result
    };
  }
};
