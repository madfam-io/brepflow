
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  uCurves: Wire[];
  vCurves: Wire[];
  points?: Point[][];
}
interface Outputs {
  surface: Face;
}

export const GordonSurfaceNode: NodeDefinition<GordonSurfaceInputs, GordonSurfaceOutputs, GordonSurfaceParams> = {
  type: 'Surface::GordonSurface',
  category: 'Surface',
  subcategory: 'NURBS',

  metadata: {
    label: 'GordonSurface',
    description: 'Create Gordon surface',
    
    
  },

  params: {
    
  },

  inputs: {
        uCurves: 'Wire[]',
    vCurves: 'Wire[]',
    points: 'Point[][]'
  },

  outputs: {
        surface: 'Face'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'gordonSurface',
      params: {
        uCurves: inputs.uCurves,
        vCurves: inputs.vCurves,
        points: inputs.points
        
      }
    });

    return {
      surface: result
    };
  }
};
