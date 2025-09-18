
import { NodeDefinition } from '@brepflow/types';

interface Params {
  cantileverDepth: number;
  treadThickness: number;
}
interface Inputs {
  wallLine: Wire;
  riseRun: Vector;
}
interface Outputs {
  floatingStair: Shape;
  anchors: Point[];
}

export const FloatingStairNode: NodeDefinition<FloatingStairInputs, FloatingStairOutputs, FloatingStairParams> = {
  type: 'Architecture::FloatingStair',
  category: 'Architecture',
  subcategory: 'Stairs',

  metadata: {
    label: 'FloatingStair',
    description: 'Floating cantilevered stairs',
    
    
  },

  params: {
        cantileverDepth: {
      "default": 100,
      "min": 50,
      "max": 200
    },
    treadThickness: {
      "default": 60,
      "min": 40,
      "max": 100
    }
  },

  inputs: {
        wallLine: 'Wire',
    riseRun: 'Vector'
  },

  outputs: {
        floatingStair: 'Shape',
    anchors: 'Point[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'floatingStair',
      params: {
        wallLine: inputs.wallLine,
        riseRun: inputs.riseRun,
        cantileverDepth: params.cantileverDepth,
        treadThickness: params.treadThickness
      }
    });

    return {
      floatingStair: result,
      anchors: result
    };
  }
};
