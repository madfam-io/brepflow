
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  complex: Complex;
}
interface Outputs {
  phase: number;
}

export const ComplexPhaseNode: NodeDefinition<ComplexPhaseInputs, ComplexPhaseOutputs, ComplexPhaseParams> = {
  type: 'Math::ComplexPhase',
  category: 'Math',
  subcategory: 'Complex',

  metadata: {
    label: 'ComplexPhase',
    description: 'Complex phase angle',
    
    
  },

  params: {
    
  },

  inputs: {
        complex: 'Complex'
  },

  outputs: {
        phase: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathComplexPhase',
      params: {
        complex: inputs.complex
        
      }
    });

    return {
      phase: result
    };
  }
};
