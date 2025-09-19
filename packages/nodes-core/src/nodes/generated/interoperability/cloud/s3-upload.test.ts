
import { describe, it, expect } from 'vitest';
import { S3UploadNode } from './s3upload-node';
import { createTestContext } from './../../test-utils';

describe('S3UploadNode', () => {
  it('should create S3Upload', async () => {
    const context = createTestContext();
    const inputs = {
      filePath: null,
      key: null
    };
    const params = {
      bucket: "",
      accessKey: "",
      secretKey: "",
      region: "us-east-1"
    };

    const result = await S3UploadNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.success).toBeDefined();
    expect(result.url).toBeDefined();
    expect(result.etag).toBeDefined();
  });

  
});