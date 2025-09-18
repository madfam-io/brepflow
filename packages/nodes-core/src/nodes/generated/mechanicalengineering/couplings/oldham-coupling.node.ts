
import { NodeDefinition } from '@brepflow/types';

interface Params {
  hubDiameter: number;
  discDiameter: number;
  slotWidth: number;
  totalLength: number;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  assembly: Shape;
  hubs: Shape[];
  disc: Shape;
}

export const OldhamCouplingNode: NodeDefinition<OldhamCouplingInputs, OldhamCouplingOutputs, OldhamCouplingParams> = {
  type: 'MechanicalEngineering::OldhamCoupling',
  category: 'MechanicalEngineering',
  subcategory: 'Couplings',

  metadata: {
    label: 'OldhamCoupling',
    description: 'Create Oldham coupling',
    
    
  },

  params: {
        hubDiameter: {
      "default": 40,
      "min": 20,
      "max": 100
    },
    discDiameter: {
      "default": 35,
      "min": 15,
      "max": 90
    },
    slotWidth: {
      "default": 8,
      "min": 3,
      "max": 20
    },
    totalLength: {
      "default": 40,
      "min": 20,
      "max": 100
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        assembly: 'Shape',
    hubs: 'Shape[]',
    disc: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'oldhamCoupling',
      params: {
        center: inputs.center,
        hubDiameter: params.hubDiameter,
        discDiameter: params.discDiameter,
        slotWidth: params.slotWidth,
        totalLength: params.totalLength
      }
    });

    return {
      assembly: result,
      hubs: result,
      disc: result
    };
  }
};
