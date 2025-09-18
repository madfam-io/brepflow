
import { NodeDefinition } from '@brepflow/types';

interface Params {
  value: number;
  resolution: number;
}
interface Inputs {
  field: ScalarField;
}
interface Outputs {
  surface: Mesh;
}

export const IsoSurfaceNode: NodeDefinition<IsoSurfaceInputs, IsoSurfaceOutputs, IsoSurfaceParams> = {
  type: 'Field::IsoSurface',
  category: 'Field',
  subcategory: 'Sample',

  metadata: {
    label: 'IsoSurface',
    description: 'Extract iso-surface',
    
    
  },

  params: {
        value: {
      "default": 0.5
    },
    resolution: {
      "default": 50,
      "min": 10,
      "max": 200,
      "step": 5
    }
  },

  inputs: {
        field: 'ScalarField'
  },

  outputs: {
        surface: 'Mesh'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fieldIsoSurface',
      params: {
        field: inputs.field,
        value: params.value,
        resolution: params.resolution
      }
    });

    return {
      surface: result
    };
  }
};
