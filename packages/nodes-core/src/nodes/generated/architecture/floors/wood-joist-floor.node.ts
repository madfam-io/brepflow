
import { NodeDefinition } from '@brepflow/types';

interface Params {
  joistDepth: number;
  joistSpacing: number;
  subfloorThickness: number;
}
interface Inputs {
  floorBoundary: Wire;
}
interface Outputs {
  floorSystem: Shape;
  joists: Shape[];
}

export const WoodJoistFloorNode: NodeDefinition<WoodJoistFloorInputs, WoodJoistFloorOutputs, WoodJoistFloorParams> = {
  type: 'Architecture::WoodJoistFloor',
  category: 'Architecture',
  subcategory: 'Floors',

  metadata: {
    label: 'WoodJoistFloor',
    description: 'Wood joist floor system',
    
    
  },

  params: {
        joistDepth: {
      "default": 250,
      "min": 150,
      "max": 400
    },
    joistSpacing: {
      "default": 400,
      "min": 300,
      "max": 600
    },
    subfloorThickness: {
      "default": 18,
      "min": 15,
      "max": 25
    }
  },

  inputs: {
        floorBoundary: 'Wire'
  },

  outputs: {
        floorSystem: 'Shape',
    joists: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'woodJoistFloor',
      params: {
        floorBoundary: inputs.floorBoundary,
        joistDepth: params.joistDepth,
        joistSpacing: params.joistSpacing,
        subfloorThickness: params.subfloorThickness
      }
    });

    return {
      floorSystem: result,
      joists: result
    };
  }
};
