
import { NodeDefinition } from '@brepflow/types';

interface Params {
  resolution: number;
  bounds: any;
  signed: boolean;
}
interface Inputs {
  geometry: Shape;
}
interface Outputs {
  field: Properties;
  isosurface: Shape;
  gradient: Vector[];
}

export const DistanceFieldNode: NodeDefinition<DistanceFieldInputs, DistanceFieldOutputs, DistanceFieldParams> = {
  type: 'Algorithmic::DistanceField',
  category: 'Algorithmic',
  subcategory: 'Geometry',

  metadata: {
    label: 'DistanceField',
    description: 'Compute signed distance field',
    
    
  },

  params: {
        resolution: {
      "default": 50,
      "min": 10,
      "max": 200
    },
    bounds: {
      "default": "100,100,100",
      "description": "Bounding box size"
    },
    signed: {
      "default": true
    }
  },

  inputs: {
        geometry: 'Shape'
  },

  outputs: {
        field: 'Properties',
    isosurface: 'Shape',
    gradient: 'Vector[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'distanceField',
      params: {
        geometry: inputs.geometry,
        resolution: params.resolution,
        bounds: params.bounds,
        signed: params.signed
      }
    });

    return {
      field: result,
      isosurface: result,
      gradient: result
    };
  }
};
