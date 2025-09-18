
import { NodeDefinition } from '@brepflow/types';

interface Params {
  dockHeight: number;
  levellerType: string;
}
interface Inputs {
  dockPosition: Point;
}
interface Outputs {
  dockRamp: Shape;
  leveller: Shape;
}

export const LoadingDockNode: NodeDefinition<LoadingDockInputs, LoadingDockOutputs, LoadingDockParams> = {
  type: 'Architecture::LoadingDock',
  category: 'Architecture',
  subcategory: 'Ramps',

  metadata: {
    label: 'LoadingDock',
    description: 'Loading dock ramp',
    
    
  },

  params: {
        dockHeight: {
      "default": 1200,
      "min": 900,
      "max": 1500
    },
    levellerType: {
      "default": "hydraulic",
      "options": [
        "hydraulic",
        "mechanical",
        "air-powered"
      ]
    }
  },

  inputs: {
        dockPosition: 'Point'
  },

  outputs: {
        dockRamp: 'Shape',
    leveller: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'loadingDock',
      params: {
        dockPosition: inputs.dockPosition,
        dockHeight: params.dockHeight,
        levellerType: params.levellerType
      }
    });

    return {
      dockRamp: result,
      leveller: result
    };
  }
};
