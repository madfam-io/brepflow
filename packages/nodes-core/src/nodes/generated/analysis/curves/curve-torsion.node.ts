
import { NodeDefinition } from '@brepflow/types';

interface Params {
  samples: number;
  scale: number;
  showGraph: boolean;
}
interface Inputs {
  curve: Wire;
}
interface Outputs {
  torsionValues: number[];
  maxTorsion: number;
  torsionGraph: Wire;
}

export const CurveTorsionNode: NodeDefinition<CurveTorsionInputs, CurveTorsionOutputs, CurveTorsionParams> = {
  type: 'Analysis::CurveTorsion',
  category: 'Analysis',
  subcategory: 'Curves',

  metadata: {
    label: 'CurveTorsion',
    description: 'Calculate curve torsion values',
    
    
  },

  params: {
        samples: {
      "default": 100,
      "min": 10,
      "max": 500
    },
    scale: {
      "default": 1,
      "min": 0.1,
      "max": 10
    },
    showGraph: {
      "default": true
    }
  },

  inputs: {
        curve: 'Wire'
  },

  outputs: {
        torsionValues: 'number[]',
    maxTorsion: 'number',
    torsionGraph: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'curveTorsion',
      params: {
        curve: inputs.curve,
        samples: params.samples,
        scale: params.scale,
        showGraph: params.showGraph
      }
    });

    return {
      torsionValues: result,
      maxTorsion: result,
      torsionGraph: result
    };
  }
};
