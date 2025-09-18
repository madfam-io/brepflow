
import { NodeDefinition } from '@brepflow/types';

interface Params {
  firstLayerHeight: number;
  growthRate: number;
  numberOfLayers: number;
  transitionRatio: number;
}
interface Inputs {
  mesh: Mesh;
  wallFaces: Face[];
}
interface Outputs {
  layeredMesh: Mesh;
}

export const BoundaryLayersNode: NodeDefinition<BoundaryLayersInputs, BoundaryLayersOutputs, BoundaryLayersParams> = {
  type: 'Simulation::BoundaryLayers',
  category: 'Simulation',
  subcategory: 'CFD',

  metadata: {
    label: 'BoundaryLayers',
    description: 'Add boundary layer mesh',
    
    
  },

  params: {
        firstLayerHeight: {
      "default": 0.01,
      "min": 0.0001,
      "max": 1
    },
    growthRate: {
      "default": 1.2,
      "min": 1,
      "max": 2
    },
    numberOfLayers: {
      "default": 5,
      "min": 1,
      "max": 20,
      "step": 1
    },
    transitionRatio: {
      "default": 0.5,
      "min": 0.1,
      "max": 1
    }
  },

  inputs: {
        mesh: 'Mesh',
    wallFaces: 'Face[]'
  },

  outputs: {
        layeredMesh: 'Mesh'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'boundaryLayers',
      params: {
        mesh: inputs.mesh,
        wallFaces: inputs.wallFaces,
        firstLayerHeight: params.firstLayerHeight,
        growthRate: params.growthRate,
        numberOfLayers: params.numberOfLayers,
        transitionRatio: params.transitionRatio
      }
    });

    return {
      layeredMesh: result
    };
  }
};
