
import { NodeDefinition } from '@brepflow/types';

interface Params {
  period: string;
  preservationLevel: string;
}
interface Inputs {
  existingWall: Shape;
}
interface Outputs {
  restoredWall: Shape;
}

export const HistoricWallRestorationNode: NodeDefinition<HistoricWallRestorationInputs, HistoricWallRestorationOutputs, HistoricWallRestorationParams> = {
  type: 'Architecture::HistoricWallRestoration',
  category: 'Architecture',
  subcategory: 'Walls',

  metadata: {
    label: 'HistoricWallRestoration',
    description: 'Historic wall analysis',
    
    
  },

  params: {
        period: {
      "default": "victorian",
      "options": [
        "victorian",
        "georgian",
        "art-deco",
        "modernist"
      ]
    },
    preservationLevel: {
      "default": "preserve",
      "options": [
        "restore",
        "rehabilitate",
        "preserve"
      ]
    }
  },

  inputs: {
        existingWall: 'Shape'
  },

  outputs: {
        restoredWall: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'historicWallRestoration',
      params: {
        existingWall: inputs.existingWall,
        period: params.period,
        preservationLevel: params.preservationLevel
      }
    });

    return {
      restoredWall: result
    };
  }
};
