
import { NodeDefinition } from '@brepflow/types';

interface Params {
  cofferSize: number;
  cofferDepth: number;
  beamWidth: number;
}
interface Inputs {
  ceilingBoundary: Wire;
}
interface Outputs {
  cofferedCeiling: Shape;
}

export const CofferedCeilingNode: NodeDefinition<CofferedCeilingInputs, CofferedCeilingOutputs, CofferedCeilingParams> = {
  type: 'Architecture::CofferedCeiling',
  category: 'Architecture',
  subcategory: 'Ceilings',

  metadata: {
    label: 'CofferedCeiling',
    description: 'Coffered ceiling pattern',
    
    
  },

  params: {
        cofferSize: {
      "default": 1200,
      "min": 600,
      "max": 2000
    },
    cofferDepth: {
      "default": 150,
      "min": 50,
      "max": 300
    },
    beamWidth: {
      "default": 200,
      "min": 100,
      "max": 400
    }
  },

  inputs: {
        ceilingBoundary: 'Wire'
  },

  outputs: {
        cofferedCeiling: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'cofferedCeiling',
      params: {
        ceilingBoundary: inputs.ceilingBoundary,
        cofferSize: params.cofferSize,
        cofferDepth: params.cofferDepth,
        beamWidth: params.beamWidth
      }
    });

    return {
      cofferedCeiling: result
    };
  }
};
