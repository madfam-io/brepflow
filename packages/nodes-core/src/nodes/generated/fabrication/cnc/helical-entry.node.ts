
import { NodeDefinition } from '@brepflow/types';

interface Params {
  helixDiameter: number;
  helixAngle: number;
}
interface Inputs {
  entryPoint: Point;
  depth: Number;
}
interface Outputs {
  helixPath: Wire;
}

export const HelicalEntryNode: NodeDefinition<HelicalEntryInputs, HelicalEntryOutputs, HelicalEntryParams> = {
  type: 'Fabrication::HelicalEntry',
  category: 'Fabrication',
  subcategory: 'CNC',

  metadata: {
    label: 'HelicalEntry',
    description: 'Helical plunge entry',
    
    
  },

  params: {
        helixDiameter: {
      "default": 10,
      "min": 1,
      "max": 50
    },
    helixAngle: {
      "default": 3,
      "min": 1,
      "max": 10
    }
  },

  inputs: {
        entryPoint: 'Point',
    depth: 'Number'
  },

  outputs: {
        helixPath: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'helicalEntry',
      params: {
        entryPoint: inputs.entryPoint,
        depth: inputs.depth,
        helixDiameter: params.helixDiameter,
        helixAngle: params.helixAngle
      }
    });

    return {
      helixPath: result
    };
  }
};
