
import { NodeDefinition } from '@brepflow/types';

interface Params {
  bucket: string;
  accessKey: string;
  secretKey: string;
  region: string;
}
interface Inputs {
  key: string;
  localPath: string;
}
interface Outputs {
  success: boolean;
  fileSize: number;
  metadata: Properties;
}

export const S3DownloadNode: NodeDefinition<S3DownloadInputs, S3DownloadOutputs, S3DownloadParams> = {
  type: 'Interoperability::S3Download',
  category: 'Interoperability',
  subcategory: 'Cloud',

  metadata: {
    label: 'S3Download',
    description: 'Download files from AWS S3',
    
    
  },

  params: {
        bucket: {
      "default": ""
    },
    accessKey: {
      "default": ""
    },
    secretKey: {
      "default": ""
    },
    region: {
      "default": "us-east-1"
    }
  },

  inputs: {
        key: 'string',
    localPath: 'string'
  },

  outputs: {
        success: 'boolean',
    fileSize: 'number',
    metadata: 'Properties'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 's3Download',
      params: {
        key: inputs.key,
        localPath: inputs.localPath,
        bucket: params.bucket,
        accessKey: params.accessKey,
        secretKey: params.secretKey,
        region: params.region
      }
    });

    return {
      success: result,
      fileSize: result,
      metadata: result
    };
  }
};
