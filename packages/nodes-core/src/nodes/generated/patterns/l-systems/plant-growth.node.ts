
import { NodeDefinition } from '@brepflow/types';

interface Params {
  species: string;
  age: number;
}
interface Inputs {
  ground: Plane;
}
interface Outputs {
  plant: Wire[];
}

export const PlantGrowthNode: NodeDefinition<PlantGrowthInputs, PlantGrowthOutputs, PlantGrowthParams> = {
  type: 'Patterns::PlantGrowth',
  category: 'Patterns',
  subcategory: 'L-Systems',

  metadata: {
    label: 'PlantGrowth',
    description: 'Parametric plant growth',
    
    
  },

  params: {
        species: {
      "default": "fern",
      "options": [
        "fern",
        "bush",
        "weed",
        "algae",
        "moss"
      ]
    },
    age: {
      "default": 5,
      "min": 1,
      "max": 20,
      "step": 1
    }
  },

  inputs: {
        ground: 'Plane'
  },

  outputs: {
        plant: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'plantGrowth',
      params: {
        ground: inputs.ground,
        species: params.species,
        age: params.age
      }
    });

    return {
      plant: result
    };
  }
};
