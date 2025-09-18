
import { NodeDefinition } from '@brepflow/types';

interface Params {
  includeToolList: boolean;
  includeFixtures: boolean;
}
interface Inputs {
  operations: Data;
}
interface Outputs {
  setupDocument: Data;
}

export const SetupSheetsNode: NodeDefinition<SetupSheetsInputs, SetupSheetsOutputs, SetupSheetsParams> = {
  type: 'Fabrication::SetupSheets',
  category: 'Fabrication',
  subcategory: 'CNC',

  metadata: {
    label: 'SetupSheets',
    description: 'Generate setup documentation',
    
    
  },

  params: {
        includeToolList: {
      "default": true
    },
    includeFixtures: {
      "default": true
    }
  },

  inputs: {
        operations: 'Data'
  },

  outputs: {
        setupDocument: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'setupSheets',
      params: {
        operations: inputs.operations,
        includeToolList: params.includeToolList,
        includeFixtures: params.includeFixtures
      }
    });

    return {
      setupDocument: result
    };
  }
};
