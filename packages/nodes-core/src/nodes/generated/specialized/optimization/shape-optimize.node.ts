
import { NodeDefinition } from '@brepflow/types';

interface Params {
  objective: string;
  morphRadius: number;
  iterations: number;
}
interface Inputs {
  initialShape: Shape;
  boundaryConditions: Data;
}
interface Outputs {
  optimized: Shape;
}

export const ShapeOptimizeNode: NodeDefinition<ShapeOptimizeInputs, ShapeOptimizeOutputs, ShapeOptimizeParams> = {
  type: 'Specialized::ShapeOptimize',
  category: 'Specialized',
  subcategory: 'Optimization',

  metadata: {
    label: 'ShapeOptimize',
    description: 'Shape optimization',
    
    
  },

  params: {
        objective: {
      "default": "min-weight",
      "options": [
        "min-weight",
        "max-stiffness",
        "min-stress"
      ]
    },
    morphRadius: {
      "default": 5,
      "min": 0.5,
      "max": 50
    },
    iterations: {
      "default": 50,
      "min": 5,
      "max": 200,
      "step": 5
    }
  },

  inputs: {
        initialShape: 'Shape',
    boundaryConditions: 'Data'
  },

  outputs: {
        optimized: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'shapeOptimize',
      params: {
        initialShape: inputs.initialShape,
        boundaryConditions: inputs.boundaryConditions,
        objective: params.objective,
        morphRadius: params.morphRadius,
        iterations: params.iterations
      }
    });

    return {
      optimized: result
    };
  }
};
