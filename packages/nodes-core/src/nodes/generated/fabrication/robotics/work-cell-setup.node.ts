
import { NodeDefinition } from '@brepflow/types';

interface Params {
  robotCount: number;
}
interface Inputs {
  cellBoundary: Box;
  fixtures?: Shape[];
}
interface Outputs {
  workCell: Data;
}

export const WorkCellSetupNode: NodeDefinition<WorkCellSetupInputs, WorkCellSetupOutputs, WorkCellSetupParams> = {
  type: 'Fabrication::WorkCellSetup',
  category: 'Fabrication',
  subcategory: 'Robotics',

  metadata: {
    label: 'WorkCellSetup',
    description: 'Setup robotic work cell',
    
    
  },

  params: {
        robotCount: {
      "default": 1,
      "min": 1,
      "max": 4,
      "step": 1
    }
  },

  inputs: {
        cellBoundary: 'Box',
    fixtures: 'Shape[]'
  },

  outputs: {
        workCell: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'workCellSetup',
      params: {
        cellBoundary: inputs.cellBoundary,
        fixtures: inputs.fixtures,
        robotCount: params.robotCount
      }
    });

    return {
      workCell: result
    };
  }
};
