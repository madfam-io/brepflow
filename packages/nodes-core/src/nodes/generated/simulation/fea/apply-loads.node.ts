
import { NodeDefinition } from '@brepflow/types';

interface Params {
  loadType: string;
  magnitude: number;
  direction: [number, number, number];
  units: string;
}
interface Inputs {
  mesh: Mesh;
  applicationFaces: Face[];
}
interface Outputs {
  loadedMesh: Mesh;
  loadData: Data;
}

export const ApplyLoadsNode: NodeDefinition<ApplyLoadsInputs, ApplyLoadsOutputs, ApplyLoadsParams> = {
  type: 'Simulation::ApplyLoads',
  category: 'Simulation',
  subcategory: 'FEA',

  metadata: {
    label: 'ApplyLoads',
    description: 'Define load conditions',
    
    
  },

  params: {
        loadType: {
      "default": "force",
      "options": [
        "force",
        "pressure",
        "torque",
        "gravity",
        "thermal"
      ]
    },
    magnitude: {
      "default": 1000,
      "min": 0,
      "max": 1000000
    },
    direction: {
      "default": [
        0,
        0,
        -1
      ]
    },
    units: {
      "default": "N",
      "options": [
        "N",
        "kN",
        "lbf",
        "Pa",
        "MPa"
      ]
    }
  },

  inputs: {
        mesh: 'Mesh',
    applicationFaces: 'Face[]'
  },

  outputs: {
        loadedMesh: 'Mesh',
    loadData: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'applyLoads',
      params: {
        mesh: inputs.mesh,
        applicationFaces: inputs.applicationFaces,
        loadType: params.loadType,
        magnitude: params.magnitude,
        direction: params.direction,
        units: params.units
      }
    });

    return {
      loadedMesh: result,
      loadData: result
    };
  }
};
