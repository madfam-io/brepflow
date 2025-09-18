
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  point1: Point;
  point2: Point;
}
interface Outputs {
  mated: Shape[];
  mate: Mate;
}

export const PointToPointNode: NodeDefinition<PointToPointInputs, PointToPointOutputs, PointToPointParams> = {
  type: 'Assembly::PointToPoint',
  category: 'Assembly',
  subcategory: 'Mates',

  metadata: {
    label: 'PointToPoint',
    description: 'Mate two points together',
    
    
  },

  params: {
    
  },

  inputs: {
        point1: 'Point',
    point2: 'Point'
  },

  outputs: {
        mated: 'Shape[]',
    mate: 'Mate'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'matePointToPoint',
      params: {
        point1: inputs.point1,
        point2: inputs.point2
        
      }
    });

    return {
      mated: result,
      mate: result
    };
  }
};
