
import { NodeDefinition } from '@brepflow/types';

interface Params {
  bucket: string;
  accessKey: string;
  secretKey: string;
  region: string;
}
interface Inputs {
  filePath: string;
  key: string;
}
interface Outputs {
  success: boolean;
  url: string;
  etag: string;
}

export const S3UploadNode: NodeDefinition<S3UploadInputs, S3UploadOutputs, S3UploadParams> = {
  type: 'Interoperability::S3Upload',
  category: 'Interoperability',
  subcategory: 'Cloud',

  metadata: {
    label: 'S3Upload',
    description: 'Upload files to AWS S3',
    
    
  },

  params: {
        bucket: {
      "default": "",
      "description": "S3 bucket name"
    },
    accessKey: {
      "default": "",
      "description": "AWS access key"
    },
    secretKey: {
      "default": "",
      "description": "AWS secret key"
    },
    region: {
      "default": "us-east-1"
    }
  },

  inputs: {
        filePath: 'string',
    key: 'string'
  },

  outputs: {
        success: 'boolean',
    url: 'string',
    etag: 'string'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 's3Upload',
      params: {
        filePath: inputs.filePath,
        key: inputs.key,
        bucket: params.bucket,
        accessKey: params.accessKey,
        secretKey: params.secretKey,
        region: params.region
      }
    });

    return {
      success: result,
      url: result,
      etag: result
    };
  }
};
