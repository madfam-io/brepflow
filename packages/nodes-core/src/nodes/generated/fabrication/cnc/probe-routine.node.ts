
import { NodeDefinition } from '@brepflow/types';

interface Params {
  probeType: string;
}
interface Inputs {
  feature: Shape;
}
interface Outputs {
  probePoints: Point[];
  probeCycle: Data;
}

export const ProbeRoutineNode: NodeDefinition<ProbeRoutineInputs, ProbeRoutineOutputs, ProbeRoutineParams> = {
  type: 'Fabrication::ProbeRoutine',
  category: 'Fabrication',
  subcategory: 'CNC',

  metadata: {
    label: 'ProbeRoutine',
    description: 'Probing cycle generation',
    
    
  },

  params: {
        probeType: {
      "default": "corner",
      "options": [
        "corner",
        "bore",
        "boss",
        "plane",
        "edge"
      ]
    }
  },

  inputs: {
        feature: 'Shape'
  },

  outputs: {
        probePoints: 'Point[]',
    probeCycle: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'probeRoutine',
      params: {
        feature: inputs.feature,
        probeType: params.probeType
      }
    });

    return {
      probePoints: result,
      probeCycle: result
    };
  }
};
