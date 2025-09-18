
import { NodeDefinition } from '@brepflow/types';

interface Params {
  printSpeed: number;
  travelSpeed: number;
  layerHeight: number;
}
interface Inputs {
  model: Shape;
}
interface Outputs {
  timeHours: Number;
  filamentMeters: Number;
}

export const PrintTimeEstimateNode: NodeDefinition<PrintTimeEstimateInputs, PrintTimeEstimateOutputs, PrintTimeEstimateParams> = {
  type: 'Fabrication::PrintTimeEstimate',
  category: 'Fabrication',
  subcategory: '3D Printing',

  metadata: {
    label: 'PrintTimeEstimate',
    description: 'Estimate print time',
    
    
  },

  params: {
        printSpeed: {
      "default": 60,
      "min": 10,
      "max": 300
    },
    travelSpeed: {
      "default": 120,
      "min": 50,
      "max": 500
    },
    layerHeight: {
      "default": 0.2,
      "min": 0.05,
      "max": 1
    }
  },

  inputs: {
        model: 'Shape'
  },

  outputs: {
        timeHours: 'Number',
    filamentMeters: 'Number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'printTimeEstimate',
      params: {
        model: inputs.model,
        printSpeed: params.printSpeed,
        travelSpeed: params.travelSpeed,
        layerHeight: params.layerHeight
      }
    });

    return {
      timeHours: result,
      filamentMeters: result
    };
  }
};
