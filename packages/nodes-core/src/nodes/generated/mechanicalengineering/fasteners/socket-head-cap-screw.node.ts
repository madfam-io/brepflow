
import { NodeDefinition } from '@brepflow/types';

interface Params {
  diameter: string;
  length: number;
  socketSize: number;
  headDiameter: number;
}
interface Inputs {
  position: Point;
}
interface Outputs {
  screw: Shape;
  socket: Wire;
}

export const SocketHeadCapScrewNode: NodeDefinition<SocketHeadCapScrewInputs, SocketHeadCapScrewOutputs, SocketHeadCapScrewParams> = {
  type: 'MechanicalEngineering::SocketHeadCapScrew',
  category: 'MechanicalEngineering',
  subcategory: 'Fasteners',

  metadata: {
    label: 'SocketHeadCapScrew',
    description: 'Create socket head cap screw',
    
    
  },

  params: {
        diameter: {
      "default": "M5",
      "options": [
        "M3",
        "M4",
        "M5",
        "M6",
        "M8",
        "M10"
      ]
    },
    length: {
      "default": 16,
      "min": 6,
      "max": 100
    },
    socketSize: {
      "default": 4,
      "min": 2,
      "max": 10
    },
    headDiameter: {
      "default": 8.5,
      "min": 5,
      "max": 20
    }
  },

  inputs: {
        position: 'Point'
  },

  outputs: {
        screw: 'Shape',
    socket: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'socketHeadScrew',
      params: {
        position: inputs.position,
        diameter: params.diameter,
        length: params.length,
        socketSize: params.socketSize,
        headDiameter: params.headDiameter
      }
    });

    return {
      screw: result,
      socket: result
    };
  }
};
