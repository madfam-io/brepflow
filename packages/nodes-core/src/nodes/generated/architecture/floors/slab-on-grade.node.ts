
import { NodeDefinition } from '@brepflow/types';

interface Params {
  thickness: number;
  vaporBarrier: boolean;
  insulation: boolean;
}
interface Inputs {
  boundary: Wire;
}
interface Outputs {
  slab: Shape;
}

export const SlabOnGradeNode: NodeDefinition<SlabOnGradeInputs, SlabOnGradeOutputs, SlabOnGradeParams> = {
  type: 'Architecture::SlabOnGrade',
  category: 'Architecture',
  subcategory: 'Floors',

  metadata: {
    label: 'SlabOnGrade',
    description: 'Concrete slab on grade',
    
    
  },

  params: {
        thickness: {
      "default": 150,
      "min": 100,
      "max": 300
    },
    vaporBarrier: {
      "default": true
    },
    insulation: {
      "default": true
    }
  },

  inputs: {
        boundary: 'Wire'
  },

  outputs: {
        slab: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'slabOnGrade',
      params: {
        boundary: inputs.boundary,
        thickness: params.thickness,
        vaporBarrier: params.vaporBarrier,
        insulation: params.insulation
      }
    });

    return {
      slab: result
    };
  }
};
