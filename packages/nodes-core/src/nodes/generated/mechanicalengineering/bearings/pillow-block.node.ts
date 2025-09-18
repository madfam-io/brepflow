
import { NodeDefinition } from '@brepflow/types';

interface Params {
  shaftDiameter: number;
  mountingHoles: number;
  baseWidth: number;
  height: number;
}
interface Inputs {
  position: Point;
}
interface Outputs {
  housing: Shape;
  bearing: Shape;
  mountingPoints: Point[];
}

export const PillowBlockNode: NodeDefinition<PillowBlockInputs, PillowBlockOutputs, PillowBlockParams> = {
  type: 'MechanicalEngineering::PillowBlock',
  category: 'MechanicalEngineering',
  subcategory: 'Bearings',

  metadata: {
    label: 'PillowBlock',
    description: 'Create pillow block bearing housing',
    
    
  },

  params: {
        shaftDiameter: {
      "default": 20,
      "min": 8,
      "max": 100
    },
    mountingHoles: {
      "default": 2,
      "min": 2,
      "max": 4
    },
    baseWidth: {
      "default": 80,
      "min": 30,
      "max": 200
    },
    height: {
      "default": 50,
      "min": 20,
      "max": 150
    }
  },

  inputs: {
        position: 'Point'
  },

  outputs: {
        housing: 'Shape',
    bearing: 'Shape',
    mountingPoints: 'Point[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'pillowBlock',
      params: {
        position: inputs.position,
        shaftDiameter: params.shaftDiameter,
        mountingHoles: params.mountingHoles,
        baseWidth: params.baseWidth,
        height: params.height
      }
    });

    return {
      housing: result,
      bearing: result,
      mountingPoints: result
    };
  }
};
