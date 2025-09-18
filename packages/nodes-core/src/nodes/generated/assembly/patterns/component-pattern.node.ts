
import { NodeDefinition } from '@brepflow/types';

interface Params {
  patternType: string;
  count: number;
  spacing: number;
}
interface Inputs {
  component: Shape;
  mates?: Mate[];
}
interface Outputs {
  pattern: Shape[];
}

export const ComponentPatternNode: NodeDefinition<ComponentPatternInputs, ComponentPatternOutputs, ComponentPatternParams> = {
  type: 'Assembly::ComponentPattern',
  category: 'Assembly',
  subcategory: 'Patterns',

  metadata: {
    label: 'ComponentPattern',
    description: 'Pattern components in assembly',
    
    
  },

  params: {
        patternType: {
      "default": "linear",
      "options": [
        "linear",
        "circular",
        "mirror"
      ]
    },
    count: {
      "default": 3,
      "min": 2,
      "max": 100
    },
    spacing: {
      "default": 100,
      "min": 0.1,
      "max": 10000
    }
  },

  inputs: {
        component: 'Shape',
    mates: 'Mate[]'
  },

  outputs: {
        pattern: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'assemblyComponentPattern',
      params: {
        component: inputs.component,
        mates: inputs.mates,
        patternType: params.patternType,
        count: params.count,
        spacing: params.spacing
      }
    });

    return {
      pattern: result
    };
  }
};
