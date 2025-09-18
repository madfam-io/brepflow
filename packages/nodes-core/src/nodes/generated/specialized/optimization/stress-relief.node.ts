
import { NodeDefinition } from '@brepflow/types';

interface Params {
  analysisType: string;
  reliefRadius: number;
}
interface Inputs {
  shape: Shape;
  stressData?: Data;
}
interface Outputs {
  relieved: Shape;
}

export const StressReliefNode: NodeDefinition<StressReliefInputs, StressReliefOutputs, StressReliefParams> = {
  type: 'Specialized::StressRelief',
  category: 'Specialized',
  subcategory: 'Optimization',

  metadata: {
    label: 'StressRelief',
    description: 'Add stress relief features',
    
    
  },

  params: {
        analysisType: {
      "default": "geometric",
      "options": [
        "fea-based",
        "geometric",
        "hybrid"
      ]
    },
    reliefRadius: {
      "default": 2,
      "min": 0.1,
      "max": 20
    }
  },

  inputs: {
        shape: 'Shape',
    stressData: 'Data'
  },

  outputs: {
        relieved: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'stressRelief',
      params: {
        shape: inputs.shape,
        stressData: inputs.stressData,
        analysisType: params.analysisType,
        reliefRadius: params.reliefRadius
      }
    });

    return {
      relieved: result
    };
  }
};
