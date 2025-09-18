
import { NodeDefinition } from '@brepflow/types';

interface Params {
  linearDeflection: number;
  angularDeflection: number;
  relative: boolean;
  qualityNormals: boolean;
}
interface Inputs {
  shape: Shape;
}
interface Outputs {
  mesh: Mesh;
  triangleCount: number;
  vertexCount: number;
}

export const TessellateNode: NodeDefinition<TessellateInputs, TessellateOutputs, TessellateParams> = {
  type: 'Mesh::Tessellate',
  category: 'Mesh',
  subcategory: 'Tessellation',

  metadata: {
    label: 'Tessellate',
    description: 'Convert shape to mesh',
    
    
  },

  params: {
        linearDeflection: {
      "default": 0.1,
      "min": 0.001,
      "max": 10,
      "description": "Maximum deviation from true surface"
    },
    angularDeflection: {
      "default": 0.5,
      "min": 0.01,
      "max": 1,
      "description": "Angular deflection in radians"
    },
    relative: {
      "default": false,
      "description": "Use relative deflection"
    },
    qualityNormals: {
      "default": true
    }
  },

  inputs: {
        shape: 'Shape'
  },

  outputs: {
        mesh: 'Mesh',
    triangleCount: 'number',
    vertexCount: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'tessellate',
      params: {
        shape: inputs.shape,
        linearDeflection: params.linearDeflection,
        angularDeflection: params.angularDeflection,
        relative: params.relative,
        qualityNormals: params.qualityNormals
      }
    });

    return {
      mesh: result,
      triangleCount: result,
      vertexCount: result
    };
  }
};
