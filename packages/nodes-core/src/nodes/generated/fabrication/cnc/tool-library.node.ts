
import { NodeDefinition } from '@brepflow/types';

interface Params {
  toolNumber: number;
  toolType: string;
}
type Inputs = {};
interface Outputs {
  toolData: Data;
}

export const ToolLibraryNode: NodeDefinition<ToolLibraryInputs, ToolLibraryOutputs, ToolLibraryParams> = {
  type: 'Fabrication::ToolLibrary',
  category: 'Fabrication',
  subcategory: 'CNC',

  metadata: {
    label: 'ToolLibrary',
    description: 'Tool library management',
    
    
  },

  params: {
        toolNumber: {
      "default": 1,
      "min": 1,
      "max": 999,
      "step": 1
    },
    toolType: {
      "default": "endmill",
      "options": [
        "endmill",
        "ballmill",
        "drill",
        "tap",
        "reamer",
        "boring"
      ]
    }
  },

  inputs: {
    
  },

  outputs: {
        toolData: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'toolLibrary',
      params: {
        
        toolNumber: params.toolNumber,
        toolType: params.toolType
      }
    });

    return {
      toolData: result
    };
  }
};
