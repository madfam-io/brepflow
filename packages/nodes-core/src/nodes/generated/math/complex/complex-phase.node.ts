import type { NodeDefinition } from '@brepflow/types';

type ComplexPhaseParams = Record<string, never>;

interface ComplexPhaseInputs {
  complex: unknown;
}

interface ComplexPhaseOutputs {
  phase: unknown;
}

export const ComplexPhaseNode: NodeDefinition<ComplexPhaseInputs, ComplexPhaseOutputs, ComplexPhaseParams> = {
  id: 'Math::ComplexPhase',
  category: 'Math',
  label: 'ComplexPhase',
  description: 'Complex phase angle',
  inputs: {
    complex: {
      type: 'Complex',
      label: 'Complex',
      required: true
    }
  },
  outputs: {
    phase: {
      type: 'number',
      label: 'Phase'
    }
  },
  params: {},
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
  },
};
