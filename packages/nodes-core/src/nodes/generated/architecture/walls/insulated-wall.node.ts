
import { NodeDefinition } from '@brepflow/types';

interface Params {
  insulationType: string;
  rValue: number;
}
interface Inputs {
  wallCavity: Shape;
}
interface Outputs {
  insulatedWall: Shape;
}

export const InsulatedWallNode: NodeDefinition<InsulatedWallInputs, InsulatedWallOutputs, InsulatedWallParams> = {
  type: 'Architecture::InsulatedWall',
  category: 'Architecture',
  subcategory: 'Walls',

  metadata: {
    label: 'InsulatedWall',
    description: 'Wall with insulation layers',
    
    
  },

  params: {
        insulationType: {
      "default": "batt",
      "options": [
        "batt",
        "rigid",
        "spray",
        "blown"
      ]
    },
    rValue: {
      "default": 19,
      "min": 5,
      "max": 50
    }
  },

  inputs: {
        wallCavity: 'Shape'
  },

  outputs: {
        insulatedWall: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'insulatedWall',
      params: {
        wallCavity: inputs.wallCavity,
        insulationType: params.insulationType,
        rValue: params.rValue
      }
    });

    return {
      insulatedWall: result
    };
  }
};
