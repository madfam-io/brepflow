
import { NodeDefinition } from '@brepflow/types';

interface Params {
  gripperType: string;
  approachAngle: number;
}
interface Inputs {
  pickPoints: Transform[];
  placePoints: Transform[];
}
interface Outputs {
  pickPlaceSequence: Transform[];
}

export const PickAndPlaceNode: NodeDefinition<PickAndPlaceInputs, PickAndPlaceOutputs, PickAndPlaceParams> = {
  type: 'Fabrication::PickAndPlace',
  category: 'Fabrication',
  subcategory: 'Robotics',

  metadata: {
    label: 'PickAndPlace',
    description: 'Pick and place optimization',
    
    
  },

  params: {
        gripperType: {
      "default": "parallel",
      "options": [
        "vacuum",
        "parallel",
        "angular",
        "magnetic"
      ]
    },
    approachAngle: {
      "default": 0,
      "min": -90,
      "max": 90
    }
  },

  inputs: {
        pickPoints: 'Transform[]',
    placePoints: 'Transform[]'
  },

  outputs: {
        pickPlaceSequence: 'Transform[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'pickAndPlace',
      params: {
        pickPoints: inputs.pickPoints,
        placePoints: inputs.placePoints,
        gripperType: params.gripperType,
        approachAngle: params.approachAngle
      }
    });

    return {
      pickPlaceSequence: result
    };
  }
};
