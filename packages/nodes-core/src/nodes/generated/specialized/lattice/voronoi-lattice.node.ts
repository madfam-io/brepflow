
import { NodeDefinition } from '@brepflow/types';

interface Params {
  seedCount: number;
  strutDiameter: number;
  randomSeed: number;
}
interface Inputs {
  boundingShape: Shape;
  seedPoints?: Point[];
}
interface Outputs {
  voronoi: Shape;
}

export const VoronoiLatticeNode: NodeDefinition<VoronoiLatticeInputs, VoronoiLatticeOutputs, VoronoiLatticeParams> = {
  type: 'Specialized::VoronoiLattice',
  category: 'Specialized',
  subcategory: 'Lattice',

  metadata: {
    label: 'VoronoiLattice',
    description: 'Voronoi-based lattice',
    
    
  },

  params: {
        seedCount: {
      "default": 100,
      "min": 10,
      "max": 10000,
      "step": 10
    },
    strutDiameter: {
      "default": 1,
      "min": 0.1,
      "max": 10
    },
    randomSeed: {
      "default": 42,
      "min": 0,
      "max": 999999,
      "step": 1
    }
  },

  inputs: {
        boundingShape: 'Shape',
    seedPoints: 'Point[]'
  },

  outputs: {
        voronoi: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'voronoiLattice',
      params: {
        boundingShape: inputs.boundingShape,
        seedPoints: inputs.seedPoints,
        seedCount: params.seedCount,
        strutDiameter: params.strutDiameter,
        randomSeed: params.randomSeed
      }
    });

    return {
      voronoi: result
    };
  }
};
