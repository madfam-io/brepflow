
import { NodeDefinition } from '@brepflow/types';

interface Params {
  threadSize: string;
  length: number;
  type: string;
}
interface Inputs {
  position: Point;
}
interface Outputs {
  insert: Shape;
  installation_hole: Wire;
}

export const ThreadInsertNode: NodeDefinition<ThreadInsertInputs, ThreadInsertOutputs, ThreadInsertParams> = {
  type: 'MechanicalEngineering::ThreadInsert',
  category: 'MechanicalEngineering',
  subcategory: 'Fasteners',

  metadata: {
    label: 'ThreadInsert',
    description: 'Create threaded insert',
    
    
  },

  params: {
        threadSize: {
      "default": "M5",
      "options": [
        "M3",
        "M4",
        "M5",
        "M6",
        "M8"
      ]
    },
    length: {
      "default": 10,
      "min": 5,
      "max": 30
    },
    type: {
      "default": "heat-set",
      "options": [
        "helicoil",
        "heat-set",
        "press-fit",
        "ultrasonic"
      ]
    }
  },

  inputs: {
        position: 'Point'
  },

  outputs: {
        insert: 'Shape',
    installation_hole: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'threadInsert',
      params: {
        position: inputs.position,
        threadSize: params.threadSize,
        length: params.length,
        type: params.type
      }
    });

    return {
      insert: result,
      installation_hole: result
    };
  }
};
