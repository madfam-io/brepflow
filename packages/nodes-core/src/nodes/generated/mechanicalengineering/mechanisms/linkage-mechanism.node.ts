
import { NodeDefinition } from '@brepflow/types';

interface Params {
  type: string;
  linkLength1: number;
  linkLength2: number;
  linkLength3: number;
  angle: number;
}
interface Inputs {
  basePoints: Point[];
}
interface Outputs {
  mechanism: Shape;
  links: Shape[];
  joints: Point[];
}

export const LinkageMechanismNode: NodeDefinition<LinkageMechanismInputs, LinkageMechanismOutputs, LinkageMechanismParams> = {
  type: 'MechanicalEngineering::LinkageMechanism',
  category: 'MechanicalEngineering',
  subcategory: 'Mechanisms',

  metadata: {
    label: 'LinkageMechanism',
    description: 'Create linkage mechanism',
    
    
  },

  params: {
        type: {
      "default": "four-bar",
      "options": [
        "four-bar",
        "slider-crank",
        "scotch-yoke",
        "geneva"
      ]
    },
    linkLength1: {
      "default": 50,
      "min": 10,
      "max": 200
    },
    linkLength2: {
      "default": 80,
      "min": 10,
      "max": 200
    },
    linkLength3: {
      "default": 60,
      "min": 10,
      "max": 200
    },
    angle: {
      "default": 0,
      "min": 0,
      "max": 360
    }
  },

  inputs: {
        basePoints: 'Point[]'
  },

  outputs: {
        mechanism: 'Shape',
    links: 'Shape[]',
    joints: 'Point[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'linkageMechanism',
      params: {
        basePoints: inputs.basePoints,
        type: params.type,
        linkLength1: params.linkLength1,
        linkLength2: params.linkLength2,
        linkLength3: params.linkLength3,
        angle: params.angle
      }
    });

    return {
      mechanism: result,
      links: result,
      joints: result
    };
  }
};
