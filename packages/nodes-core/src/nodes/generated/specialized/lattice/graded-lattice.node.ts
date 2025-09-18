
import { NodeDefinition } from '@brepflow/types';

interface Params {
  minDensity: number;
  maxDensity: number;
  gradientType: string;
}
interface Inputs {
  boundingShape: Shape;
  densityField?: Data;
}
interface Outputs {
  gradedLattice: Shape;
}

export const GradedLatticeNode: NodeDefinition<GradedLatticeInputs, GradedLatticeOutputs, GradedLatticeParams> = {
  type: 'Specialized::GradedLattice',
  category: 'Specialized',
  subcategory: 'Lattice',

  metadata: {
    label: 'GradedLattice',
    description: 'Density-graded lattice',
    
    
  },

  params: {
        minDensity: {
      "default": 0.2,
      "min": 0.1,
      "max": 0.9
    },
    maxDensity: {
      "default": 0.8,
      "min": 0.2,
      "max": 0.95
    },
    gradientType: {
      "default": "linear",
      "options": [
        "linear",
        "radial",
        "field"
      ]
    }
  },

  inputs: {
        boundingShape: 'Shape',
    densityField: 'Data'
  },

  outputs: {
        gradedLattice: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'gradedLattice',
      params: {
        boundingShape: inputs.boundingShape,
        densityField: inputs.densityField,
        minDensity: params.minDensity,
        maxDensity: params.maxDensity,
        gradientType: params.gradientType
      }
    });

    return {
      gradedLattice: result
    };
  }
};
