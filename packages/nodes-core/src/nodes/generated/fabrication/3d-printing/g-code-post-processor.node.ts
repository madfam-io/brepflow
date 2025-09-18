
import { NodeDefinition } from '@brepflow/types';

interface Params {
  flavor: string;
  optimize: boolean;
}
interface Inputs {
  toolpaths: Wire[];
}
interface Outputs {
  gcode: Data;
}

export const GCodePostProcessorNode: NodeDefinition<GCodePostProcessorInputs, GCodePostProcessorOutputs, GCodePostProcessorParams> = {
  type: 'Fabrication::GCodePostProcessor',
  category: 'Fabrication',
  subcategory: '3D Printing',

  metadata: {
    label: 'GCodePostProcessor',
    description: 'Post-process G-code',
    
    
  },

  params: {
        flavor: {
      "default": "marlin",
      "options": [
        "marlin",
        "reprap",
        "klipper",
        "smoothie"
      ]
    },
    optimize: {
      "default": true
    }
  },

  inputs: {
        toolpaths: 'Wire[]'
  },

  outputs: {
        gcode: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'gcodePostProcessor',
      params: {
        toolpaths: inputs.toolpaths,
        flavor: params.flavor,
        optimize: params.optimize
      }
    });

    return {
      gcode: result
    };
  }
};
