import type { NodeDefinition } from '@brepflow/types';

interface AlignParams {
  alignX: string;
  alignY: string;
  alignZ: string;
}

interface AlignInputs {
  shapes: unknown;
  reference?: unknown;
}

interface AlignOutputs {
  aligned: unknown;
}

export const AlignNode: NodeDefinition<AlignInputs, AlignOutputs, AlignParams> = {
  id: 'Transform::Align',
  category: 'Transform',
  label: 'Align',
  description: 'Align shapes to each other',
  inputs: {
    shapes: {
      type: 'Shape[]',
      label: 'Shapes',
      required: true
    },
    reference: {
      type: 'Shape',
      label: 'Reference',
      optional: true
    }
  },
  outputs: {
    aligned: {
      type: 'Shape[]',
      label: 'Aligned'
    }
  },
  params: {
    alignX: {
      type: 'enum',
      label: 'Align X',
      default: "center",
      options: ["none","min","center","max"]
    },
    alignY: {
      type: 'enum',
      label: 'Align Y',
      default: "center",
      options: ["none","min","center","max"]
    },
    alignZ: {
      type: 'enum',
      label: 'Align Z',
      default: "none",
      options: ["none","min","center","max"]
    }
  },
  async evaluate(context, inputs, params) {
    const result = await context.geometry.execute({
      type: 'transformAlign',
      params: {
        shapes: inputs.shapes,
        reference: inputs.reference,
        alignX: params.alignX,
        alignY: params.alignY,
        alignZ: params.alignZ
      }
    });
    
    return {
      aligned: result
    };
  },
};
