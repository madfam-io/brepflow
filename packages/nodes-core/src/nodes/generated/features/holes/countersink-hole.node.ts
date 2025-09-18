
import { NodeDefinition } from '@brepflow/types';

interface Params {
  holeDiameter: number;
  countersinkDiameter: number;
  angle: string;
  depth: number;
}
interface Inputs {
  solid: Shape;
  position: Point;
}
interface Outputs {
  shape: Shape;
}

export const CountersinkHoleNode: NodeDefinition<CountersinkHoleInputs, CountersinkHoleOutputs, CountersinkHoleParams> = {
  type: 'Features::CountersinkHole',
  category: 'Features',
  subcategory: 'Holes',

  metadata: {
    label: 'CountersinkHole',
    description: 'Creates a countersink hole for flat head screws',
    
    tags: ["hole","countersink","fastener","FHS"],
  },

  params: {
        holeDiameter: {
      "default": 6.5,
      "min": 0.1,
      "max": 100
    },
    countersinkDiameter: {
      "default": 12,
      "min": 0.1,
      "max": 200
    },
    angle: {
      "default": "90",
      "options": [
        "82",
        "90",
        "100",
        "120"
      ],
      "description": "Countersink angle in degrees"
    },
    depth: {
      "default": -1,
      "min": -1
    }
  },

  inputs: {
        solid: 'Shape',
    position: 'Point'
  },

  outputs: {
        shape: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makeCountersink',
      params: {
        solid: inputs.solid,
        position: inputs.position,
        holeDiameter: params.holeDiameter,
        countersinkDiameter: params.countersinkDiameter,
        angle: params.angle,
        depth: params.depth
      }
    });

    return {
      shape: result
    };
  }
};
