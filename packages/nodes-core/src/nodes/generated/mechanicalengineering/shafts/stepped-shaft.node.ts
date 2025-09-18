
import { NodeDefinition } from '@brepflow/types';

interface Params {
  sections: string;
  chamfers: boolean;
  filletRadius: number;
}
interface Inputs {
  centerline: Wire;
}
interface Outputs {
  shaft: Shape;
  sections: Shape[];
}

export const SteppedShaftNode: NodeDefinition<SteppedShaftInputs, SteppedShaftOutputs, SteppedShaftParams> = {
  type: 'MechanicalEngineering::SteppedShaft',
  category: 'MechanicalEngineering',
  subcategory: 'Shafts',

  metadata: {
    label: 'SteppedShaft',
    description: 'Create stepped shaft',
    
    
  },

  params: {
        sections: {
      "default": "20x50,25x80,20x30",
      "description": "Diameter x Length pairs"
    },
    chamfers: {
      "default": true
    },
    filletRadius: {
      "default": 1,
      "min": 0.5,
      "max": 5
    }
  },

  inputs: {
        centerline: 'Wire'
  },

  outputs: {
        shaft: 'Shape',
    sections: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'steppedShaft',
      params: {
        centerline: inputs.centerline,
        sections: params.sections,
        chamfers: params.chamfers,
        filletRadius: params.filletRadius
      }
    });

    return {
      shaft: result,
      sections: result
    };
  }
};
