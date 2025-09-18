
import { NodeDefinition } from '@brepflow/types';

interface Params {
  thickness: number;
  reinforcementRatio: number;
}
interface Inputs {
  wallOutline: Wire;
}
interface Outputs {
  shearWall: Shape;
  reinforcement: Wire[];
}

export const ShearWallNode: NodeDefinition<ShearWallInputs, ShearWallOutputs, ShearWallParams> = {
  type: 'Architecture::ShearWall',
  category: 'Architecture',
  subcategory: 'Walls',

  metadata: {
    label: 'ShearWall',
    description: 'Structural shear wall',
    
    
  },

  params: {
        thickness: {
      "default": 300,
      "min": 200,
      "max": 500
    },
    reinforcementRatio: {
      "default": 0.025,
      "min": 0.01,
      "max": 0.04
    }
  },

  inputs: {
        wallOutline: 'Wire'
  },

  outputs: {
        shearWall: 'Shape',
    reinforcement: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'shearWall',
      params: {
        wallOutline: inputs.wallOutline,
        thickness: params.thickness,
        reinforcementRatio: params.reinforcementRatio
      }
    });

    return {
      shearWall: result,
      reinforcement: result
    };
  }
};
