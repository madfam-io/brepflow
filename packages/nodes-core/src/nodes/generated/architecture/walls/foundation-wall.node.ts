
import { NodeDefinition } from '@brepflow/types';

interface Params {
  depth: number;
  footingWidth: number;
}
interface Inputs {
  foundationLine: Wire;
}
interface Outputs {
  foundationWall: Shape;
  footing: Shape;
}

export const FoundationWallNode: NodeDefinition<FoundationWallInputs, FoundationWallOutputs, FoundationWallParams> = {
  type: 'Architecture::FoundationWall',
  category: 'Architecture',
  subcategory: 'Walls',

  metadata: {
    label: 'FoundationWall',
    description: 'Foundation wall system',
    
    
  },

  params: {
        depth: {
      "default": 1500,
      "min": 1000,
      "max": 3000
    },
    footingWidth: {
      "default": 600,
      "min": 400,
      "max": 1200
    }
  },

  inputs: {
        foundationLine: 'Wire'
  },

  outputs: {
        foundationWall: 'Shape',
    footing: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'foundationWall',
      params: {
        foundationLine: inputs.foundationLine,
        depth: params.depth,
        footingWidth: params.footingWidth
      }
    });

    return {
      foundationWall: result,
      footing: result
    };
  }
};
