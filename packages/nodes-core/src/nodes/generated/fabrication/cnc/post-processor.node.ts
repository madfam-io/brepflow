
import { NodeDefinition } from '@brepflow/types';

interface Params {
  machine: string;
  axes: string;
}
interface Inputs {
  toolpaths: Wire[];
}
interface Outputs {
  ncCode: Data;
}

export const PostProcessorNode: NodeDefinition<PostProcessorInputs, PostProcessorOutputs, PostProcessorParams> = {
  type: 'Fabrication::PostProcessor',
  category: 'Fabrication',
  subcategory: 'CNC',

  metadata: {
    label: 'PostProcessor',
    description: 'CNC post-processor',
    
    
  },

  params: {
        machine: {
      "default": "haas",
      "options": [
        "haas",
        "fanuc",
        "siemens",
        "heidenhain",
        "mazak"
      ]
    },
    axes: {
      "default": "3-axis",
      "options": [
        "3-axis",
        "4-axis",
        "5-axis"
      ]
    }
  },

  inputs: {
        toolpaths: 'Wire[]'
  },

  outputs: {
        ncCode: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'postProcessor',
      params: {
        toolpaths: inputs.toolpaths,
        machine: params.machine,
        axes: params.axes
      }
    });

    return {
      ncCode: result
    };
  }
};
