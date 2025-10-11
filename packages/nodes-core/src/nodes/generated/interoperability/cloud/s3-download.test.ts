
import { describe, it, expect } from 'vitest';
import { S3DownloadNode } from './s3-download.node';
import { createTestContext } from '../test-utils';

describe('S3DownloadNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      key: undefined,
      localPath: undefined
    } as any;
    const params = {
      bucket: "",
      accessKey: "",
      secretKey: "",
      region: "us-east-1"
    } as any;

    const result = await S3DownloadNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
