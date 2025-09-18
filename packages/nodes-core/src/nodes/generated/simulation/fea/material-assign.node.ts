
import { NodeDefinition } from '@brepflow/types';

interface Params {
  material: string;
  youngsModulus: number;
  poissonsRatio: number;
  density: number;
  yieldStrength: number;
}
interface Inputs {
  mesh: Mesh;
  bodies?: Shape[];
}
interface Outputs {
  materializedMesh: Mesh;
  materialData: Data;
}

export const MaterialAssignNode: NodeDefinition<MaterialAssignInputs, MaterialAssignOutputs, MaterialAssignParams> = {
  type: 'Simulation::MaterialAssign',
  category: 'Simulation',
  subcategory: 'FEA',

  metadata: {
    label: 'MaterialAssign',
    description: 'Assign material properties',
    
    
  },

  params: {
        material: {
      "default": "steel",
      "options": [
        "steel",
        "aluminum",
        "titanium",
        "plastic",
        "composite",
        "custom"
      ]
    },
    youngsModulus: {
      "default": 200000,
      "min": 1,
      "max": 1000000,
      "description": "MPa"
    },
    poissonsRatio: {
      "default": 0.3,
      "min": 0,
      "max": 0.5
    },
    density: {
      "default": 7850,
      "min": 1,
      "max": 20000,
      "description": "kg/m³"
    },
    yieldStrength: {
      "default": 250,
      "min": 1,
      "max": 5000,
      "description": "MPa"
    }
  },

  inputs: {
        mesh: 'Mesh',
    bodies: 'Shape[]'
  },

  outputs: {
        materializedMesh: 'Mesh',
    materialData: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'materialAssign',
      params: {
        mesh: inputs.mesh,
        bodies: inputs.bodies,
        material: params.material,
        youngsModulus: params.youngsModulus,
        poissonsRatio: params.poissonsRatio,
        density: params.density,
        yieldStrength: params.yieldStrength
      }
    });

    return {
      materializedMesh: result,
      materialData: result
    };
  }
};
