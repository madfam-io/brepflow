
import { NodeDefinition } from '@brepflow/types';

interface Params {
  bendRadius: number;
  materialThickness: number;
  kerfWidth: number;
}
interface Inputs {
  bendZone: Face;
}
interface Outputs {
  kerfPattern: Wire[];
}

export const KerfBendingNode: NodeDefinition<KerfBendingInputs, KerfBendingOutputs, KerfBendingParams> = {
  type: 'Fabrication::KerfBending',
  category: 'Fabrication',
  subcategory: 'Laser',

  metadata: {
    label: 'KerfBending',
    description: 'Kerf bending patterns',
    
    
  },

  params: {
        bendRadius: {
      "default": 50,
      "min": 10,
      "max": 500
    },
    materialThickness: {
      "default": 3,
      "min": 0.5,
      "max": 20
    },
    kerfWidth: {
      "default": 0.15,
      "min": 0.05,
      "max": 1
    }
  },

  inputs: {
        bendZone: 'Face'
  },

  outputs: {
        kerfPattern: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'kerfBending',
      params: {
        bendZone: inputs.bendZone,
        bendRadius: params.bendRadius,
        materialThickness: params.materialThickness,
        kerfWidth: params.kerfWidth
      }
    });

    return {
      kerfPattern: result
    };
  }
};
