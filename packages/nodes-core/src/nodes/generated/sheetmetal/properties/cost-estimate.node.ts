
import { NodeDefinition } from '@brepflow/types';

interface Params {
  materialCostPerKg: number;
  setupCost: number;
  bendCost: number;
  cutCostPerMeter: number;
}
interface Inputs {
  sheet: Shape;
  quantity?: number;
}
interface Outputs {
  cost: number;
  breakdown: Data;
}

export const CostEstimateNode: NodeDefinition<CostEstimateInputs, CostEstimateOutputs, CostEstimateParams> = {
  type: 'SheetMetal::CostEstimate',
  category: 'SheetMetal',
  subcategory: 'Properties',

  metadata: {
    label: 'CostEstimate',
    description: 'Estimate manufacturing cost',
    
    
  },

  params: {
        materialCostPerKg: {
      "default": 2,
      "min": 0.1,
      "max": 1000
    },
    setupCost: {
      "default": 50,
      "min": 0,
      "max": 10000
    },
    bendCost: {
      "default": 0.5,
      "min": 0,
      "max": 100,
      "description": "Cost per bend"
    },
    cutCostPerMeter: {
      "default": 1,
      "min": 0,
      "max": 100
    }
  },

  inputs: {
        sheet: 'Shape',
    quantity: 'number'
  },

  outputs: {
        cost: 'number',
    breakdown: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'sheetCostEstimate',
      params: {
        sheet: inputs.sheet,
        quantity: inputs.quantity,
        materialCostPerKg: params.materialCostPerKg,
        setupCost: params.setupCost,
        bendCost: params.bendCost,
        cutCostPerMeter: params.cutCostPerMeter
      }
    });

    return {
      cost: result,
      breakdown: result
    };
  }
};
