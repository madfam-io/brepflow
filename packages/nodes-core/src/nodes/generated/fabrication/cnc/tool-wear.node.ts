
import { NodeDefinition } from '@brepflow/types';

interface Params {
  material: string;
  cuttingTime: number;
}
interface Inputs {
  toolpath: Wire[];
}
interface Outputs {
  wearRate: Number;
  toolLife: Number;
}

export const ToolWearNode: NodeDefinition<ToolWearInputs, ToolWearOutputs, ToolWearParams> = {
  type: 'Fabrication::ToolWear',
  category: 'Fabrication',
  subcategory: 'CNC',

  metadata: {
    label: 'ToolWear',
    description: 'Predict tool wear',
    
    
  },

  params: {
        material: {
      "default": "steel",
      "options": [
        "aluminum",
        "steel",
        "titanium",
        "inconel"
      ]
    },
    cuttingTime: {
      "default": 60,
      "min": 1,
      "max": 1000
    }
  },

  inputs: {
        toolpath: 'Wire[]'
  },

  outputs: {
        wearRate: 'Number',
    toolLife: 'Number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'toolWear',
      params: {
        toolpath: inputs.toolpath,
        material: params.material,
        cuttingTime: params.cuttingTime
      }
    });

    return {
      wearRate: result,
      toolLife: result
    };
  }
};
