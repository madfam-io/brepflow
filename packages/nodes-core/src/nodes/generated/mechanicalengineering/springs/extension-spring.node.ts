
import { NodeDefinition } from '@brepflow/types';

interface Params {
  wireDiameter: number;
  coilDiameter: number;
  bodyLength: number;
  coils: number;
  hookType: string;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  spring: Shape;
  hooks: Wire[];
}

export const ExtensionSpringNode: NodeDefinition<ExtensionSpringInputs, ExtensionSpringOutputs, ExtensionSpringParams> = {
  type: 'MechanicalEngineering::ExtensionSpring',
  category: 'MechanicalEngineering',
  subcategory: 'Springs',

  metadata: {
    label: 'ExtensionSpring',
    description: 'Create extension spring with hooks',
    
    
  },

  params: {
        wireDiameter: {
      "default": 1.5,
      "min": 0.5,
      "max": 8
    },
    coilDiameter: {
      "default": 15,
      "min": 5,
      "max": 80
    },
    bodyLength: {
      "default": 40,
      "min": 10,
      "max": 150
    },
    coils: {
      "default": 10,
      "min": 5,
      "max": 40
    },
    hookType: {
      "default": "machine",
      "options": [
        "machine",
        "side",
        "center"
      ]
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        spring: 'Shape',
    hooks: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'extensionSpring',
      params: {
        center: inputs.center,
        wireDiameter: params.wireDiameter,
        coilDiameter: params.coilDiameter,
        bodyLength: params.bodyLength,
        coils: params.coils,
        hookType: params.hookType
      }
    });

    return {
      spring: result,
      hooks: result
    };
  }
};
