
import { NodeDefinition } from '@brepflow/types';

interface Params {
  requiredClearance: number;
  highlightViolations: boolean;
}
interface Inputs {
  movingObject: Shape;
  obstacles: Shape[];
}
interface Outputs {
  hasViolations: boolean;
  violationPoints: Point[];
  clearanceValues: number[];
}

export const ClearanceCheckNode: NodeDefinition<ClearanceCheckInputs, ClearanceCheckOutputs, ClearanceCheckParams> = {
  type: 'Analysis::ClearanceCheck',
  category: 'Analysis',
  subcategory: 'Proximity',

  metadata: {
    label: 'ClearanceCheck',
    description: 'Check clearance requirements',
    
    
  },

  params: {
        requiredClearance: {
      "default": 5,
      "min": 0.1,
      "max": 100
    },
    highlightViolations: {
      "default": true
    }
  },

  inputs: {
        movingObject: 'Shape',
    obstacles: 'Shape[]'
  },

  outputs: {
        hasViolations: 'boolean',
    violationPoints: 'Point[]',
    clearanceValues: 'number[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'clearanceCheck',
      params: {
        movingObject: inputs.movingObject,
        obstacles: inputs.obstacles,
        requiredClearance: params.requiredClearance,
        highlightViolations: params.highlightViolations
      }
    });

    return {
      hasViolations: result,
      violationPoints: result,
      clearanceValues: result
    };
  }
};
