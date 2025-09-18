
import { NodeDefinition } from '@brepflow/types';

interface Params {
  leadAngle: number;
  tiltAngle: number;
}
interface Inputs {
  surface: Face;
  toolAxis?: Vector;
}
interface Outputs {
  toolOrientations: Transform[];
}

export const FiveAxisPositioningNode: NodeDefinition<FiveAxisPositioningInputs, FiveAxisPositioningOutputs, FiveAxisPositioningParams> = {
  type: 'Fabrication::FiveAxisPositioning',
  category: 'Fabrication',
  subcategory: 'CNC',

  metadata: {
    label: 'FiveAxisPositioning',
    description: '5-axis positioning strategy',
    
    
  },

  params: {
        leadAngle: {
      "default": 10,
      "min": 0,
      "max": 45
    },
    tiltAngle: {
      "default": 0,
      "min": -90,
      "max": 90
    }
  },

  inputs: {
        surface: 'Face',
    toolAxis: 'Vector'
  },

  outputs: {
        toolOrientations: 'Transform[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fiveAxisPositioning',
      params: {
        surface: inputs.surface,
        toolAxis: inputs.toolAxis,
        leadAngle: params.leadAngle,
        tiltAngle: params.tiltAngle
      }
    });

    return {
      toolOrientations: result
    };
  }
};
