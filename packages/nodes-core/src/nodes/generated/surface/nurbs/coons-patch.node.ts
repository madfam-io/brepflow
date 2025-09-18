
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  edge1: Edge;
  edge2: Edge;
  edge3: Edge;
  edge4: Edge;
}
interface Outputs {
  surface: Face;
}

export const CoonsPatchNode: NodeDefinition<CoonsPatchInputs, CoonsPatchOutputs, CoonsPatchParams> = {
  type: 'Surface::CoonsPatch',
  category: 'Surface',
  subcategory: 'NURBS',

  metadata: {
    label: 'CoonsPatch',
    description: 'Create Coons patch surface',
    
    
  },

  params: {
    
  },

  inputs: {
        edge1: 'Edge',
    edge2: 'Edge',
    edge3: 'Edge',
    edge4: 'Edge'
  },

  outputs: {
        surface: 'Face'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'coonsPatch',
      params: {
        edge1: inputs.edge1,
        edge2: inputs.edge2,
        edge3: inputs.edge3,
        edge4: inputs.edge4
        
      }
    });

    return {
      surface: result
    };
  }
};
