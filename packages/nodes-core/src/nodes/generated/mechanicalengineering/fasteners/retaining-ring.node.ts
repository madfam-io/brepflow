
import { NodeDefinition } from '@brepflow/types';

interface Params {
  shaftDiameter: number;
  type: string;
  thickness: number;
  grooveWidth: number;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  ring: Shape;
  groove: Wire;
}

export const RetainingRingNode: NodeDefinition<RetainingRingInputs, RetainingRingOutputs, RetainingRingParams> = {
  type: 'MechanicalEngineering::RetainingRing',
  category: 'MechanicalEngineering',
  subcategory: 'Fasteners',

  metadata: {
    label: 'RetainingRing',
    description: 'Create retaining ring/circlip',
    
    
  },

  params: {
        shaftDiameter: {
      "default": 10,
      "min": 3,
      "max": 100
    },
    type: {
      "default": "external",
      "options": [
        "external",
        "internal"
      ]
    },
    thickness: {
      "default": 1,
      "min": 0.5,
      "max": 3
    },
    grooveWidth: {
      "default": 1.2,
      "min": 0.6,
      "max": 4
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        ring: 'Shape',
    groove: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'retainingRing',
      params: {
        center: inputs.center,
        shaftDiameter: params.shaftDiameter,
        type: params.type,
        thickness: params.thickness,
        grooveWidth: params.grooveWidth
      }
    });

    return {
      ring: result,
      groove: result
    };
  }
};
