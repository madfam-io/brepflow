
import { describe, it, expect } from 'vitest';
import { S3DownloadNode } from './s3download-node';
import { createTestContext } from '../test-utils';

describe('S3DownloadNode', () => {
  it('should create S3Download', async () => {
    const context = createTestContext();
    const inputs = {
      key: null,
      localPath: null
    };
    const params = {
      bucket: "",
      accessKey: "",
      secretKey: "",
      region: "us-east-1"
    };

    const result = await S3DownloadNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.success).toBeDefined();
    expect(result.fileSize).toBeDefined();
    expect(result.metadata).toBeDefined();
  });

  
});