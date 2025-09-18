
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  solid: Shape;
  facesToRemove: Face[];
  thicknessMap: Data;
}
interface Outputs {
  shell: Shape;
}

export const VariableShellNode: NodeDefinition<VariableShellInputs, VariableShellOutputs, VariableShellParams> = {
  type: 'Advanced::VariableShell',
  category: 'Advanced',
  subcategory: 'Shell',

  metadata: {
    label: 'VariableShell',
    description: 'Shell with variable thickness',
    
    
  },

  params: {
    
  },

  inputs: {
        solid: 'Shape',
    facesToRemove: 'Face[]',
    thicknessMap: 'Data'
  },

  outputs: {
        shell: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'variableShell',
      params: {
        solid: inputs.solid,
        facesToRemove: inputs.facesToRemove,
        thicknessMap: inputs.thicknessMap
        
      }
    });

    return {
      shell: result
    };
  }
};
