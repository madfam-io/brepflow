
import { NodeDefinition } from '@brepflow/types';

interface Params {
  beamDepth: number;
  beamWidth: number;
  spacing: number;
}
interface Inputs {
  ceilingArea: Face;
}
interface Outputs {
  beams: Shape[];
}

export const CeilingBeamNode: NodeDefinition<CeilingBeamInputs, CeilingBeamOutputs, CeilingBeamParams> = {
  type: 'Architecture::CeilingBeam',
  category: 'Architecture',
  subcategory: 'Ceilings',

  metadata: {
    label: 'CeilingBeam',
    description: 'Exposed ceiling beams',
    
    
  },

  params: {
        beamDepth: {
      "default": 300,
      "min": 200,
      "max": 600
    },
    beamWidth: {
      "default": 150,
      "min": 100,
      "max": 300
    },
    spacing: {
      "default": 1200,
      "min": 600,
      "max": 2400
    }
  },

  inputs: {
        ceilingArea: 'Face'
  },

  outputs: {
        beams: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'ceilingBeam',
      params: {
        ceilingArea: inputs.ceilingArea,
        beamDepth: params.beamDepth,
        beamWidth: params.beamWidth,
        spacing: params.spacing
      }
    });

    return {
      beams: result
    };
  }
};
