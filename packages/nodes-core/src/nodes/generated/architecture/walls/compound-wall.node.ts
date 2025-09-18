
import { NodeDefinition } from '@brepflow/types';

interface Params {
  layers: number;
  layerThicknesses: string;
  layerMaterials: string;
}
interface Inputs {
  path: Wire;
}
interface Outputs {
  compoundWall: Shape;
  layers: Shape[];
}

export const CompoundWallNode: NodeDefinition<CompoundWallInputs, CompoundWallOutputs, CompoundWallParams> = {
  type: 'Architecture::CompoundWall',
  category: 'Architecture',
  subcategory: 'Walls',

  metadata: {
    label: 'CompoundWall',
    description: 'Multi-layer wall assembly',
    
    
  },

  params: {
        layers: {
      "default": 3,
      "min": 1,
      "max": 10,
      "step": 1
    },
    layerThicknesses: {
      "default": "100,50,100"
    },
    layerMaterials: {
      "default": "brick,insulation,drywall"
    }
  },

  inputs: {
        path: 'Wire'
  },

  outputs: {
        compoundWall: 'Shape',
    layers: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'compoundWall',
      params: {
        path: inputs.path,
        layers: params.layers,
        layerThicknesses: params.layerThicknesses,
        layerMaterials: params.layerMaterials
      }
    });

    return {
      compoundWall: result,
      layers: result
    };
  }
};
