import type { NodeDefinition } from '@brepflow/types';

type ModeParams = Record<string, never>;

interface ModeInputs {
  values: unknown;
}

interface ModeOutputs {
  mode: unknown;
}

export const MathStatisticsModeNode: NodeDefinition<ModeInputs, ModeOutputs, ModeParams> = {
  id: 'Math::Mode',
  category: 'Math',
  label: 'Mode',
  description: 'Calculate mode',
  inputs: {
    values: {
      type: 'number[]',
      label: 'Values',
      required: true
    }
  },
  outputs: {
    mode: {
      type: 'number[]',
      label: 'Mode'
    }
  },
  params: {},
  async evaluate(context, inputs, params) {
    const result = await context.geometry.execute({
      type: 'mathMode',
      params: {
        values: inputs.values
      }
    });
    
    return {
      mode: result
    };
  },
};
