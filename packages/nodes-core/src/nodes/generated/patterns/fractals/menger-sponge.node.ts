
import { NodeDefinition } from '@brepflow/types';

interface Params {
  iterations: number;
}
interface Inputs {
  cube: Shape;
}
interface Outputs {
  fractal: Shape;
}

export const MengerSpongeNode: NodeDefinition<MengerSpongeInputs, MengerSpongeOutputs, MengerSpongeParams> = {
  type: 'Patterns::MengerSponge',
  category: 'Patterns',
  subcategory: 'Fractals',

  metadata: {
    label: 'MengerSponge',
    description: 'Menger sponge 3D fractal',
    
    
  },

  params: {
        iterations: {
      "default": 3,
      "min": 0,
      "max": 4,
      "step": 1
    }
  },

  inputs: {
        cube: 'Shape'
  },

  outputs: {
        fractal: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mengerSponge',
      params: {
        cube: inputs.cube,
        iterations: params.iterations
      }
    });

    return {
      fractal: result
    };
  }
};
