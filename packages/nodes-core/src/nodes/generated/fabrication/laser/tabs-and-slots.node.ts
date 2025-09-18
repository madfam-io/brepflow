
import { NodeDefinition } from '@brepflow/types';

interface Params {
  tabWidth: number;
  tabDepth: number;
  clearance: number;
}
interface Inputs {
  edges: Edge[];
}
interface Outputs {
  tabbedEdges: Wire[];
}

export const TabsAndSlotsNode: NodeDefinition<TabsAndSlotsInputs, TabsAndSlotsOutputs, TabsAndSlotsParams> = {
  type: 'Fabrication::TabsAndSlots',
  category: 'Fabrication',
  subcategory: 'Laser',

  metadata: {
    label: 'TabsAndSlots',
    description: 'Add tabs for assembly',
    
    
  },

  params: {
        tabWidth: {
      "default": 10,
      "min": 1,
      "max": 50
    },
    tabDepth: {
      "default": 5,
      "min": 1,
      "max": 20
    },
    clearance: {
      "default": 0.1,
      "min": 0,
      "max": 1
    }
  },

  inputs: {
        edges: 'Edge[]'
  },

  outputs: {
        tabbedEdges: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'tabsAndSlots',
      params: {
        edges: inputs.edges,
        tabWidth: params.tabWidth,
        tabDepth: params.tabDepth,
        clearance: params.clearance
      }
    });

    return {
      tabbedEdges: result
    };
  }
};
