
import { NodeDefinition } from '@brepflow/types';

interface Params {
  nozzleSize: number;
  layerHeight: number;
}
interface Inputs {
  printPaths: Wire[];
}
interface Outputs {
  roboticPrintPath: Transform[];
}

export const AdditiveManufacturingNode: NodeDefinition<AdditiveManufacturingInputs, AdditiveManufacturingOutputs, AdditiveManufacturingParams> = {
  type: 'Fabrication::AdditiveManufacturing',
  category: 'Fabrication',
  subcategory: 'Robotics',

  metadata: {
    label: 'AdditiveManufacturing',
    description: 'Robotic 3D printing',
    
    
  },

  params: {
        nozzleSize: {
      "default": 4,
      "min": 0.4,
      "max": 10
    },
    layerHeight: {
      "default": 2,
      "min": 0.1,
      "max": 5
    }
  },

  inputs: {
        printPaths: 'Wire[]'
  },

  outputs: {
        roboticPrintPath: 'Transform[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'additiveManufacturing',
      params: {
        printPaths: inputs.printPaths,
        nozzleSize: params.nozzleSize,
        layerHeight: params.layerHeight
      }
    });

    return {
      roboticPrintPath: result
    };
  }
};
