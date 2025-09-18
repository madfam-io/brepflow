
import { NodeDefinition } from '@brepflow/types';

interface Params {
  boundaryType: string;
  velocity: number;
  pressure: number;
  temperature: number;
}
interface Inputs {
  mesh: Mesh;
  boundaryFaces: Face[];
}
interface Outputs {
  boundaryMesh: Mesh;
  boundaryData: Data;
}

export const InletOutletNode: NodeDefinition<InletOutletInputs, InletOutletOutputs, InletOutletParams> = {
  type: 'Simulation::InletOutlet',
  category: 'Simulation',
  subcategory: 'CFD',

  metadata: {
    label: 'InletOutlet',
    description: 'Define inlet/outlet conditions',
    
    
  },

  params: {
        boundaryType: {
      "default": "velocity-inlet",
      "options": [
        "velocity-inlet",
        "pressure-inlet",
        "mass-flow-inlet",
        "pressure-outlet",
        "outflow"
      ]
    },
    velocity: {
      "default": 1,
      "min": 0,
      "max": 1000,
      "description": "m/s"
    },
    pressure: {
      "default": 101325,
      "min": 0,
      "max": 10000000,
      "description": "Pa"
    },
    temperature: {
      "default": 293,
      "min": 0,
      "max": 1000,
      "description": "K"
    }
  },

  inputs: {
        mesh: 'Mesh',
    boundaryFaces: 'Face[]'
  },

  outputs: {
        boundaryMesh: 'Mesh',
    boundaryData: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'inletOutlet',
      params: {
        mesh: inputs.mesh,
        boundaryFaces: inputs.boundaryFaces,
        boundaryType: params.boundaryType,
        velocity: params.velocity,
        pressure: params.pressure,
        temperature: params.temperature
      }
    });

    return {
      boundaryMesh: result,
      boundaryData: result
    };
  }
};
