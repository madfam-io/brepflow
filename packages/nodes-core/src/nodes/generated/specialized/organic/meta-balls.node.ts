
import { NodeDefinition } from '@brepflow/types';

interface Params {
  threshold: number;
  resolution: number;
}
interface Inputs {
  centers: Point[];
  radii: number[];
}
interface Outputs {
  metaball: Shape;
}

export const MetaBallsNode: NodeDefinition<MetaBallsInputs, MetaBallsOutputs, MetaBallsParams> = {
  type: 'Specialized::MetaBalls',
  category: 'Specialized',
  subcategory: 'Organic',

  metadata: {
    label: 'MetaBalls',
    description: 'Create metaball surfaces',
    
    
  },

  params: {
        threshold: {
      "default": 1,
      "min": 0.1,
      "max": 10
    },
    resolution: {
      "default": 50,
      "min": 10,
      "max": 200,
      "step": 5
    }
  },

  inputs: {
        centers: 'Point[]',
    radii: 'number[]'
  },

  outputs: {
        metaball: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'metaballs',
      params: {
        centers: inputs.centers,
        radii: inputs.radii,
        threshold: params.threshold,
        resolution: params.resolution
      }
    });

    return {
      metaball: result
    };
  }
};
