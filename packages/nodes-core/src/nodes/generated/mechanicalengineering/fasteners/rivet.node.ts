
import { NodeDefinition } from '@brepflow/types';

interface Params {
  diameter: number;
  length: number;
  headType: string;
  material: string;
}
interface Inputs {
  position: Point;
}
interface Outputs {
  rivet: Shape;
}

export const RivetNode: NodeDefinition<RivetInputs, RivetOutputs, RivetParams> = {
  type: 'MechanicalEngineering::Rivet',
  category: 'MechanicalEngineering',
  subcategory: 'Fasteners',

  metadata: {
    label: 'Rivet',
    description: 'Create rivet fastener',
    
    
  },

  params: {
        diameter: {
      "default": 4,
      "min": 2,
      "max": 10
    },
    length: {
      "default": 10,
      "min": 5,
      "max": 30
    },
    headType: {
      "default": "round",
      "options": [
        "round",
        "flat",
        "countersunk",
        "pan"
      ]
    },
    material: {
      "default": "aluminum",
      "options": [
        "aluminum",
        "steel",
        "stainless",
        "copper"
      ]
    }
  },

  inputs: {
        position: 'Point'
  },

  outputs: {
        rivet: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'rivet',
      params: {
        position: inputs.position,
        diameter: params.diameter,
        length: params.length,
        headType: params.headType,
        material: params.material
      }
    });

    return {
      rivet: result
    };
  }
};
