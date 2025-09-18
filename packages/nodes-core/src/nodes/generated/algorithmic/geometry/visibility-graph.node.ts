
import { NodeDefinition } from '@brepflow/types';

interface Params {
  epsilon: number;
  includeInterior: boolean;
}
interface Inputs {
  obstacles: Shape[];
  start: Point;
  goal: Point;
}
interface Outputs {
  graph: Wire[];
  vertices: Point[];
  edges: Properties[];
}

export const VisibilityGraphNode: NodeDefinition<VisibilityGraphInputs, VisibilityGraphOutputs, VisibilityGraphParams> = {
  type: 'Algorithmic::VisibilityGraph',
  category: 'Algorithmic',
  subcategory: 'Geometry',

  metadata: {
    label: 'VisibilityGraph',
    description: 'Compute visibility graph for path planning',
    
    
  },

  params: {
        epsilon: {
      "default": 0.01,
      "min": 0.001,
      "max": 1
    },
    includeInterior: {
      "default": false
    }
  },

  inputs: {
        obstacles: 'Shape[]',
    start: 'Point',
    goal: 'Point'
  },

  outputs: {
        graph: 'Wire[]',
    vertices: 'Point[]',
    edges: 'Properties[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'visibilityGraph',
      params: {
        obstacles: inputs.obstacles,
        start: inputs.start,
        goal: inputs.goal,
        epsilon: params.epsilon,
        includeInterior: params.includeInterior
      }
    });

    return {
      graph: result,
      vertices: result,
      edges: result
    };
  }
};
