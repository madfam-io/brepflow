
import { NodeDefinition } from '@brepflow/types';

interface Params {
  material: string;
  pattern: string;
}
interface Inputs {
  floorArea: Face;
}
interface Outputs {
  finishedFloor: Face;
  pattern: Wire[];
}

export const FloorFinishNode: NodeDefinition<FloorFinishInputs, FloorFinishOutputs, FloorFinishParams> = {
  type: 'Architecture::FloorFinish',
  category: 'Architecture',
  subcategory: 'Floors',

  metadata: {
    label: 'FloorFinish',
    description: 'Floor finish materials',
    
    
  },

  params: {
        material: {
      "default": "tile",
      "options": [
        "tile",
        "wood",
        "carpet",
        "vinyl",
        "polished-concrete"
      ]
    },
    pattern: {
      "default": "straight",
      "options": [
        "straight",
        "diagonal",
        "herringbone",
        "random"
      ]
    }
  },

  inputs: {
        floorArea: 'Face'
  },

  outputs: {
        finishedFloor: 'Face',
    pattern: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'floorFinish',
      params: {
        floorArea: inputs.floorArea,
        material: params.material,
        pattern: params.pattern
      }
    });

    return {
      finishedFloor: result,
      pattern: result
    };
  }
};
