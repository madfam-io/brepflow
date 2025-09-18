
import { NodeDefinition } from '@brepflow/types';

interface Params {
  width: number;
  height: number;
  sashPosition: number;
}
interface Inputs {
  position: Point;
}
interface Outputs {
  window: Shape;
  upperSash: Shape;
  lowerSash: Shape;
}

export const DoubleHungWindowNode: NodeDefinition<DoubleHungWindowInputs, DoubleHungWindowOutputs, DoubleHungWindowParams> = {
  type: 'Architecture::DoubleHungWindow',
  category: 'Architecture',
  subcategory: 'Windows',

  metadata: {
    label: 'DoubleHungWindow',
    description: 'Double hung window',
    
    
  },

  params: {
        width: {
      "default": 900,
      "min": 600,
      "max": 1500
    },
    height: {
      "default": 1500,
      "min": 900,
      "max": 2400
    },
    sashPosition: {
      "default": 0.5,
      "min": 0,
      "max": 1
    }
  },

  inputs: {
        position: 'Point'
  },

  outputs: {
        window: 'Shape',
    upperSash: 'Shape',
    lowerSash: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'doubleHungWindow',
      params: {
        position: inputs.position,
        width: params.width,
        height: params.height,
        sashPosition: params.sashPosition
      }
    });

    return {
      window: result,
      upperSash: result,
      lowerSash: result
    };
  }
};
