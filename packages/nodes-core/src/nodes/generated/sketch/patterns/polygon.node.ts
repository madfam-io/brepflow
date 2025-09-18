
import { NodeDefinition } from '@brepflow/types';

interface Params {
  sides: number;
  radius: number;
  inscribed: boolean;
}
interface Inputs {
  center?: Point;
}
interface Outputs {
  polygon: Wire;
}

export const PolygonNode: NodeDefinition<PolygonInputs, PolygonOutputs, PolygonParams> = {
  type: 'Sketch::Polygon',
  category: 'Sketch',
  subcategory: 'Patterns',

  metadata: {
    label: 'Polygon',
    description: 'Create a regular polygon',
    
    
  },

  params: {
        sides: {
      "default": 6,
      "min": 3,
      "max": 100,
      "step": 1
    },
    radius: {
      "default": 50,
      "min": 0.1,
      "max": 10000
    },
    inscribed: {
      "default": true,
      "description": "Inscribed vs circumscribed"
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        polygon: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makePolygon',
      params: {
        center: inputs.center,
        sides: params.sides,
        radius: params.radius,
        inscribed: params.inscribed
      }
    });

    return {
      polygon: result
    };
  }
};
