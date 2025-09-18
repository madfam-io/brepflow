
import { NodeDefinition } from '@brepflow/types';

interface Params {
  coreDiameter: number;
  outerDiameter: number;
  length: number;
  windingAngle: number;
}
interface Inputs {
  path: Wire;
}
interface Outputs {
  shaft: Shape;
  centerline: Wire;
}

export const FlexibleShaftNode: NodeDefinition<FlexibleShaftInputs, FlexibleShaftOutputs, FlexibleShaftParams> = {
  type: 'MechanicalEngineering::FlexibleShaft',
  category: 'MechanicalEngineering',
  subcategory: 'Shafts',

  metadata: {
    label: 'FlexibleShaft',
    description: 'Create flexible shaft design',
    
    
  },

  params: {
        coreDiameter: {
      "default": 5,
      "min": 2,
      "max": 20
    },
    outerDiameter: {
      "default": 8,
      "min": 4,
      "max": 30
    },
    length: {
      "default": 300,
      "min": 100,
      "max": 1000
    },
    windingAngle: {
      "default": 45,
      "min": 30,
      "max": 60
    }
  },

  inputs: {
        path: 'Wire'
  },

  outputs: {
        shaft: 'Shape',
    centerline: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'flexibleShaft',
      params: {
        path: inputs.path,
        coreDiameter: params.coreDiameter,
        outerDiameter: params.outerDiameter,
        length: params.length,
        windingAngle: params.windingAngle
      }
    });

    return {
      shaft: result,
      centerline: result
    };
  }
};
