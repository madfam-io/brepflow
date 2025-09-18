
import { NodeDefinition } from '@brepflow/types';

interface Params {
  operatingHours: number;
}
interface Inputs {
  robotData: Data;
}
interface Outputs {
  maintenanceSchedule: Data;
}

export const RobotMaintenanceNode: NodeDefinition<RobotMaintenanceInputs, RobotMaintenanceOutputs, RobotMaintenanceParams> = {
  type: 'Fabrication::RobotMaintenance',
  category: 'Fabrication',
  subcategory: 'Robotics',

  metadata: {
    label: 'RobotMaintenance',
    description: 'Maintenance scheduling',
    
    
  },

  params: {
        operatingHours: {
      "default": 1000,
      "min": 0,
      "max": 50000
    }
  },

  inputs: {
        robotData: 'Data'
  },

  outputs: {
        maintenanceSchedule: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'robotMaintenance',
      params: {
        robotData: inputs.robotData,
        operatingHours: params.operatingHours
      }
    });

    return {
      maintenanceSchedule: result
    };
  }
};
