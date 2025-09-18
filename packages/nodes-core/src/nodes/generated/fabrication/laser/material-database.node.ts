
import { NodeDefinition } from '@brepflow/types';

interface Params {
  material: string;
  thickness: number;
}
type Inputs = {};
interface Outputs {
  cuttingSpeed: Number;
  power: Number;
  frequency: Number;
}

export const MaterialDatabaseNode: NodeDefinition<MaterialDatabaseInputs, MaterialDatabaseOutputs, MaterialDatabaseParams> = {
  type: 'Fabrication::MaterialDatabase',
  category: 'Fabrication',
  subcategory: 'Laser',

  metadata: {
    label: 'MaterialDatabase',
    description: 'Material cutting database',
    
    
  },

  params: {
        material: {
      "default": "acrylic",
      "options": [
        "acrylic",
        "plywood",
        "mdf",
        "leather",
        "paper",
        "fabric"
      ]
    },
    thickness: {
      "default": 3,
      "min": 0.1,
      "max": 50
    }
  },

  inputs: {
    
  },

  outputs: {
        cuttingSpeed: 'Number',
    power: 'Number',
    frequency: 'Number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'materialDatabase',
      params: {
        
        material: params.material,
        thickness: params.thickness
      }
    });

    return {
      cuttingSpeed: result,
      power: result,
      frequency: result
    };
  }
};
