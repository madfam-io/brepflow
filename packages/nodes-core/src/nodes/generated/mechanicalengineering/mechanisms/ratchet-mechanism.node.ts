
import { NodeDefinition } from '@brepflow/types';

interface Params {
  wheelDiameter: number;
  teeth: number;
  pawlLength: number;
  springTension: number;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  assembly: Shape;
  wheel: Shape;
  pawl: Shape;
}

export const RatchetMechanismNode: NodeDefinition<RatchetMechanismInputs, RatchetMechanismOutputs, RatchetMechanismParams> = {
  type: 'MechanicalEngineering::RatchetMechanism',
  category: 'MechanicalEngineering',
  subcategory: 'Mechanisms',

  metadata: {
    label: 'RatchetMechanism',
    description: 'Create ratchet and pawl',
    
    
  },

  params: {
        wheelDiameter: {
      "default": 50,
      "min": 20,
      "max": 150
    },
    teeth: {
      "default": 24,
      "min": 12,
      "max": 60
    },
    pawlLength: {
      "default": 20,
      "min": 10,
      "max": 50
    },
    springTension: {
      "default": 5,
      "min": 1,
      "max": 20
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        assembly: 'Shape',
    wheel: 'Shape',
    pawl: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'ratchetMechanism',
      params: {
        center: inputs.center,
        wheelDiameter: params.wheelDiameter,
        teeth: params.teeth,
        pawlLength: params.pawlLength,
        springTension: params.springTension
      }
    });

    return {
      assembly: result,
      wheel: result,
      pawl: result
    };
  }
};
