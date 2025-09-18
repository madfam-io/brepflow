
import { NodeDefinition } from '@brepflow/types';

interface Params {
  drillDiameter: number;
  peckDepth: number;
  dwellTime: number;
}
interface Inputs {
  holes: Point[];
  depths: number[];
}
interface Outputs {
  drillCycles: Data;
}

export const DrillingOperationNode: NodeDefinition<DrillingOperationInputs, DrillingOperationOutputs, DrillingOperationParams> = {
  type: 'Fabrication::DrillingOperation',
  category: 'Fabrication',
  subcategory: 'CNC',

  metadata: {
    label: 'DrillingOperation',
    description: 'Drilling operation setup',
    
    
  },

  params: {
        drillDiameter: {
      "default": 8,
      "min": 0.1,
      "max": 50
    },
    peckDepth: {
      "default": 5,
      "min": 0,
      "max": 20
    },
    dwellTime: {
      "default": 0,
      "min": 0,
      "max": 10
    }
  },

  inputs: {
        holes: 'Point[]',
    depths: 'number[]'
  },

  outputs: {
        drillCycles: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'drillingOperation',
      params: {
        holes: inputs.holes,
        depths: inputs.depths,
        drillDiameter: params.drillDiameter,
        peckDepth: params.peckDepth,
        dwellTime: params.dwellTime
      }
    });

    return {
      drillCycles: result
    };
  }
};
