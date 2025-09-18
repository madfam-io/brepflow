
import { NodeDefinition } from '@brepflow/types';

interface Params {
  panelThickness: number;
  reinforcement: boolean;
}
interface Inputs {
  panelOutline: Wire;
}
interface Outputs {
  panel: Shape;
  liftingPoints: Point[];
}

export const TiltUpPanelNode: NodeDefinition<TiltUpPanelInputs, TiltUpPanelOutputs, TiltUpPanelParams> = {
  type: 'Architecture::TiltUpPanel',
  category: 'Architecture',
  subcategory: 'Walls',

  metadata: {
    label: 'TiltUpPanel',
    description: 'Tilt-up concrete panel',
    
    
  },

  params: {
        panelThickness: {
      "default": 200,
      "min": 150,
      "max": 400
    },
    reinforcement: {
      "default": true
    }
  },

  inputs: {
        panelOutline: 'Wire'
  },

  outputs: {
        panel: 'Shape',
    liftingPoints: 'Point[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'tiltUpPanel',
      params: {
        panelOutline: inputs.panelOutline,
        panelThickness: params.panelThickness,
        reinforcement: params.reinforcement
      }
    });

    return {
      panel: result,
      liftingPoints: result
    };
  }
};
