
import { NodeDefinition } from '@brepflow/types';

interface Params {
  aspectRatioThreshold: number;
  skewnessThreshold: number;
}
interface Inputs {
  mesh: Shape;
}
interface Outputs {
  averageAspectRatio: number;
  maxSkewness: number;
  problemElements: Shape[];
  qualityReport: Properties;
}

export const MeshQualityNode: NodeDefinition<MeshQualityInputs, MeshQualityOutputs, MeshQualityParams> = {
  type: 'Analysis::MeshQuality',
  category: 'Analysis',
  subcategory: 'Quality',

  metadata: {
    label: 'MeshQuality',
    description: 'Analyze mesh quality metrics',
    
    
  },

  params: {
        aspectRatioThreshold: {
      "default": 5,
      "min": 1,
      "max": 20
    },
    skewnessThreshold: {
      "default": 0.8,
      "min": 0.1,
      "max": 1
    }
  },

  inputs: {
        mesh: 'Shape'
  },

  outputs: {
        averageAspectRatio: 'number',
    maxSkewness: 'number',
    problemElements: 'Shape[]',
    qualityReport: 'Properties'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'meshQuality',
      params: {
        mesh: inputs.mesh,
        aspectRatioThreshold: params.aspectRatioThreshold,
        skewnessThreshold: params.skewnessThreshold
      }
    });

    return {
      averageAspectRatio: result,
      maxSkewness: result,
      problemElements: result,
      qualityReport: result
    };
  }
};
