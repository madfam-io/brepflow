
import { NodeDefinition } from '@brepflow/types';

interface Params {
  shaft1Diameter: number;
  shaft2Diameter: number;
  couplingDiameter: number;
  length: number;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  coupling: Shape;
  bores: Wire[];
}

export const RigidCouplingNode: NodeDefinition<RigidCouplingInputs, RigidCouplingOutputs, RigidCouplingParams> = {
  type: 'MechanicalEngineering::RigidCoupling',
  category: 'MechanicalEngineering',
  subcategory: 'Couplings',

  metadata: {
    label: 'RigidCoupling',
    description: 'Create rigid shaft coupling',
    
    
  },

  params: {
        shaft1Diameter: {
      "default": 20,
      "min": 5,
      "max": 100
    },
    shaft2Diameter: {
      "default": 20,
      "min": 5,
      "max": 100
    },
    couplingDiameter: {
      "default": 40,
      "min": 15,
      "max": 150
    },
    length: {
      "default": 50,
      "min": 20,
      "max": 150
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        coupling: 'Shape',
    bores: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'rigidCoupling',
      params: {
        center: inputs.center,
        shaft1Diameter: params.shaft1Diameter,
        shaft2Diameter: params.shaft2Diameter,
        couplingDiameter: params.couplingDiameter,
        length: params.length
      }
    });

    return {
      coupling: result,
      bores: result
    };
  }
};
