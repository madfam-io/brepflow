
import { NodeDefinition } from '@brepflow/types';

interface Params {
  mass: number;
  G: number;
}
interface Inputs {
  bodies: Point[];
  masses?: number[];
}
interface Outputs {
  field: VectorField;
}

export const GravityAttractorNode: NodeDefinition<GravityAttractorInputs, GravityAttractorOutputs, GravityAttractorParams> = {
  type: 'Field::GravityAttractor',
  category: 'Field',
  subcategory: 'Attractor',

  metadata: {
    label: 'GravityAttractor',
    description: 'Gravity well attractor',
    
    
  },

  params: {
        mass: {
      "default": 100,
      "min": 0.1
    },
    G: {
      "default": 1,
      "min": 0.001,
      "description": "Gravitational constant"
    }
  },

  inputs: {
        bodies: 'Point[]',
    masses: 'number[]'
  },

  outputs: {
        field: 'VectorField'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'attractorGravity',
      params: {
        bodies: inputs.bodies,
        masses: inputs.masses,
        mass: params.mass,
        G: params.G
      }
    });

    return {
      field: result
    };
  }
};
