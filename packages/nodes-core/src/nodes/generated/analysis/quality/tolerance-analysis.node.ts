
import { NodeDefinition } from '@brepflow/types';

interface Params {
  nominalTolerance: number;
  showDeviations: boolean;
}
interface Inputs {
  measured: Shape;
  nominal: Shape;
}
interface Outputs {
  withinTolerance: boolean;
  maxDeviation: number;
  deviationMap: Shape;
}

export const ToleranceAnalysisNode: NodeDefinition<ToleranceAnalysisInputs, ToleranceAnalysisOutputs, ToleranceAnalysisParams> = {
  type: 'Analysis::ToleranceAnalysis',
  category: 'Analysis',
  subcategory: 'Quality',

  metadata: {
    label: 'ToleranceAnalysis',
    description: 'Analyze geometric tolerances',
    
    
  },

  params: {
        nominalTolerance: {
      "default": 0.1,
      "min": 0.001,
      "max": 10
    },
    showDeviations: {
      "default": true
    }
  },

  inputs: {
        measured: 'Shape',
    nominal: 'Shape'
  },

  outputs: {
        withinTolerance: 'boolean',
    maxDeviation: 'number',
    deviationMap: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'toleranceAnalysis',
      params: {
        measured: inputs.measured,
        nominal: inputs.nominal,
        nominalTolerance: params.nominalTolerance,
        showDeviations: params.showDeviations
      }
    });

    return {
      withinTolerance: result,
      maxDeviation: result,
      deviationMap: result
    };
  }
};
