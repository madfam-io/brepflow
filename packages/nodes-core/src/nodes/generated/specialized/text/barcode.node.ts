
import { NodeDefinition } from '@brepflow/types';

interface Params {
  type: string;
  data: string;
  size: number;
  height: number;
}
type Inputs = {};
interface Outputs {
  barcode: Shape;
}

export const BarcodeNode: NodeDefinition<BarcodeInputs, BarcodeOutputs, BarcodeParams> = {
  type: 'Specialized::Barcode',
  category: 'Specialized',
  subcategory: 'Text',

  metadata: {
    label: 'Barcode',
    description: 'Generate barcode geometry',
    
    
  },

  params: {
        type: {
      "default": "QR",
      "options": [
        "QR",
        "Code128",
        "Code39",
        "EAN13"
      ]
    },
    data: {
      "default": "123456789"
    },
    size: {
      "default": 20,
      "min": 5,
      "max": 200
    },
    height: {
      "default": 0.5,
      "min": 0.01,
      "max": 10
    }
  },

  inputs: {
    
  },

  outputs: {
        barcode: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'barcode',
      params: {
        
        type: params.type,
        data: params.data,
        size: params.size,
        height: params.height
      }
    });

    return {
      barcode: result
    };
  }
};
