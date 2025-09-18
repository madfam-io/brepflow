
import { NodeDefinition } from '@brepflow/types';

interface Params {
  distance: number;
  parallel: boolean;
}
interface Inputs {
  plane1: Plane;
  plane2: Plane;
}
interface Outputs {
  mated: Shape[];
  mate: Mate;
}

export const PlaneToPlaneNode: NodeDefinition<PlaneToPlaneInputs, PlaneToPlaneOutputs, PlaneToPlaneParams> = {
  type: 'Assembly::PlaneToPlane',
  category: 'Assembly',
  subcategory: 'Mates',

  metadata: {
    label: 'PlaneToPlane',
    description: 'Mate two planes',
    
    
  },

  params: {
        distance: {
      "default": 0
    },
    parallel: {
      "default": true
    }
  },

  inputs: {
        plane1: 'Plane',
    plane2: 'Plane'
  },

  outputs: {
        mated: 'Shape[]',
    mate: 'Mate'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'matePlaneToPlane',
      params: {
        plane1: inputs.plane1,
        plane2: inputs.plane2,
        distance: params.distance,
        parallel: params.parallel
      }
    });

    return {
      mated: result,
      mate: result
    };
  }
};
