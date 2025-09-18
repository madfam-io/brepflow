
import { NodeDefinition } from '@brepflow/types';

interface Params {
  innerDiameter: number;
  outerDiameter: number;
  length: number;
  oilGrooves: boolean;
  flanged: boolean;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  bushing: Shape;
  grooves: Wire[];
}

export const BronzeBushingNode: NodeDefinition<BronzeBushingInputs, BronzeBushingOutputs, BronzeBushingParams> = {
  type: 'MechanicalEngineering::BronzeBushing',
  category: 'MechanicalEngineering',
  subcategory: 'Bearings',

  metadata: {
    label: 'BronzeBushing',
    description: 'Create bronze bushing',
    
    
  },

  params: {
        innerDiameter: {
      "default": 10,
      "min": 3,
      "max": 100
    },
    outerDiameter: {
      "default": 14,
      "min": 5,
      "max": 120
    },
    length: {
      "default": 15,
      "min": 5,
      "max": 100
    },
    oilGrooves: {
      "default": true
    },
    flanged: {
      "default": false
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        bushing: 'Shape',
    grooves: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'bronzeBushing',
      params: {
        center: inputs.center,
        innerDiameter: params.innerDiameter,
        outerDiameter: params.outerDiameter,
        length: params.length,
        oilGrooves: params.oilGrooves,
        flanged: params.flanged
      }
    });

    return {
      bushing: result,
      grooves: result
    };
  }
};
