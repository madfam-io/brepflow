
import { NodeDefinition } from '@brepflow/types';

interface Params {
  isovalue: number;
  resolution: number;
  smooth: boolean;
}
interface Inputs {
  scalarField: Properties;
}
interface Outputs {
  mesh: Shape;
  vertices: Point[];
  normals: Vector[];
}

export const MarchingCubesNode: NodeDefinition<MarchingCubesInputs, MarchingCubesOutputs, MarchingCubesParams> = {
  type: 'Algorithmic::MarchingCubes',
  category: 'Algorithmic',
  subcategory: 'Geometry',

  metadata: {
    label: 'MarchingCubes',
    description: 'Extract isosurface using marching cubes',
    
    
  },

  params: {
        isovalue: {
      "default": 0,
      "min": -100,
      "max": 100
    },
    resolution: {
      "default": 32,
      "min": 8,
      "max": 128
    },
    smooth: {
      "default": true
    }
  },

  inputs: {
        scalarField: 'Properties'
  },

  outputs: {
        mesh: 'Shape',
    vertices: 'Point[]',
    normals: 'Vector[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'marchingCubes',
      params: {
        scalarField: inputs.scalarField,
        isovalue: params.isovalue,
        resolution: params.resolution,
        smooth: params.smooth
      }
    });

    return {
      mesh: result,
      vertices: result,
      normals: result
    };
  }
};
