
import { NodeDefinition } from '@brepflow/types';

interface Params {
  maxHoleSize: number;
  fillMethod: string;
}
interface Inputs {
  mesh: Mesh;
}
interface Outputs {
  filled: Mesh;
  holesCount: number;
}

export const FillHolesNode: NodeDefinition<FillHolesInputs, FillHolesOutputs, FillHolesParams> = {
  type: 'Mesh::FillHoles',
  category: 'Mesh',
  subcategory: 'Repair',

  metadata: {
    label: 'FillHoles',
    description: 'Fill mesh holes',
    
    
  },

  params: {
        maxHoleSize: {
      "default": 100,
      "min": 1,
      "max": 10000,
      "description": "Max edges in hole boundary"
    },
    fillMethod: {
      "default": "smooth",
      "options": [
        "flat",
        "smooth",
        "curvature"
      ]
    }
  },

  inputs: {
        mesh: 'Mesh'
  },

  outputs: {
        filled: 'Mesh',
    holesCount: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fillHoles',
      params: {
        mesh: inputs.mesh,
        maxHoleSize: params.maxHoleSize,
        fillMethod: params.fillMethod
      }
    });

    return {
      filled: result,
      holesCount: result
    };
  }
};
