
import { NodeDefinition } from '@brepflow/types';

interface Params {
  viewAngle: number;
  maxDistance: number;
}
interface Inputs {
  viewpoint: Point;
  targets: Point[];
  obstacles?: Shape[];
}
interface Outputs {
  visibleTargets: Point[];
  occludedTargets: Point[];
  sightLines: Wire[];
}

export const VisibilityAnalysisNode: NodeDefinition<VisibilityAnalysisInputs, VisibilityAnalysisOutputs, VisibilityAnalysisParams> = {
  type: 'Analysis::VisibilityAnalysis',
  category: 'Analysis',
  subcategory: 'Proximity',

  metadata: {
    label: 'VisibilityAnalysis',
    description: 'Analyze line-of-sight visibility',
    
    
  },

  params: {
        viewAngle: {
      "default": 120,
      "min": 10,
      "max": 360
    },
    maxDistance: {
      "default": 100,
      "min": 1,
      "max": 1000
    }
  },

  inputs: {
        viewpoint: 'Point',
    targets: 'Point[]',
    obstacles: 'Shape[]'
  },

  outputs: {
        visibleTargets: 'Point[]',
    occludedTargets: 'Point[]',
    sightLines: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'visibilityAnalysis',
      params: {
        viewpoint: inputs.viewpoint,
        targets: inputs.targets,
        obstacles: inputs.obstacles,
        viewAngle: params.viewAngle,
        maxDistance: params.maxDistance
      }
    });

    return {
      visibleTargets: result,
      occludedTargets: result,
      sightLines: result
    };
  }
};
