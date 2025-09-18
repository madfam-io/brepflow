
import { NodeDefinition } from '@brepflow/types';

interface Params {
  diameter: number;
  length: number;
  tolerance: string;
  chamfered: boolean;
}
interface Inputs {
  position: Point;
  direction?: Vector;
}
interface Outputs {
  dowel: Shape;
}

export const DowelNode: NodeDefinition<DowelInputs, DowelOutputs, DowelParams> = {
  type: 'MechanicalEngineering::Dowel',
  category: 'MechanicalEngineering',
  subcategory: 'Fasteners',

  metadata: {
    label: 'Dowel',
    description: 'Create dowel pin',
    
    
  },

  params: {
        diameter: {
      "default": 6,
      "min": 2,
      "max": 20
    },
    length: {
      "default": 20,
      "min": 5,
      "max": 100
    },
    tolerance: {
      "default": "h7",
      "options": [
        "h6",
        "h7",
        "h8",
        "m6"
      ]
    },
    chamfered: {
      "default": true
    }
  },

  inputs: {
        position: 'Point',
    direction: 'Vector'
  },

  outputs: {
        dowel: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'dowelPin',
      params: {
        position: inputs.position,
        direction: inputs.direction,
        diameter: params.diameter,
        length: params.length,
        tolerance: params.tolerance,
        chamfered: params.chamfered
      }
    });

    return {
      dowel: result
    };
  }
};
