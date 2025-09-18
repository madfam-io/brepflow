
import { NodeDefinition } from '@brepflow/types';

interface Params {
  projection: number;
  material: string;
}
interface Inputs {
  treadEdges: Edge[];
}
interface Outputs {
  nosing: Shape[];
}

export const StairNosingNode: NodeDefinition<StairNosingInputs, StairNosingOutputs, StairNosingParams> = {
  type: 'Architecture::StairNosing',
  category: 'Architecture',
  subcategory: 'Stairs',

  metadata: {
    label: 'StairNosing',
    description: 'Stair nosing profile',
    
    
  },

  params: {
        projection: {
      "default": 25,
      "min": 20,
      "max": 40
    },
    material: {
      "default": "aluminum",
      "options": [
        "aluminum",
        "rubber",
        "wood",
        "stone"
      ]
    }
  },

  inputs: {
        treadEdges: 'Edge[]'
  },

  outputs: {
        nosing: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'stairNosing',
      params: {
        treadEdges: inputs.treadEdges,
        projection: params.projection,
        material: params.material
      }
    });

    return {
      nosing: result
    };
  }
};
