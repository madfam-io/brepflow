
import { NodeDefinition } from '@brepflow/types';

interface Params {
  resolution: number;
  dithering: string;
}
interface Inputs {
  image: Data;
  boundary: Wire;
}
interface Outputs {
  rasterData: Data;
}

export const EngraveRasterNode: NodeDefinition<EngraveRasterInputs, EngraveRasterOutputs, EngraveRasterParams> = {
  type: 'Fabrication::EngraveRaster',
  category: 'Fabrication',
  subcategory: 'Laser',

  metadata: {
    label: 'EngraveRaster',
    description: 'Generate raster engraving',
    
    
  },

  params: {
        resolution: {
      "default": 300,
      "min": 100,
      "max": 1200
    },
    dithering: {
      "default": "floyd-steinberg",
      "options": [
        "none",
        "floyd-steinberg",
        "ordered",
        "random"
      ]
    }
  },

  inputs: {
        image: 'Data',
    boundary: 'Wire'
  },

  outputs: {
        rasterData: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'engraveRaster',
      params: {
        image: inputs.image,
        boundary: inputs.boundary,
        resolution: params.resolution,
        dithering: params.dithering
      }
    });

    return {
      rasterData: result
    };
  }
};
