
import { describe, it, expect } from 'vitest';
import { PointCloudProcessingNode } from './pointcloudprocessing-node';
import { createTestContext } from '../test-utils';

describe('PointCloudProcessingNode', () => {
  it('should create PointCloudProcessing', async () => {
    const context = createTestContext();
    const inputs = {
      points: /* test value */
    };
    const params = {
      operation: "filter",
      radius: 1,
      neighbors: 6
    };

    const result = await PointCloudProcessingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.processed).toBeDefined();
    expect(result.normals).toBeDefined();
    expect(result.indices).toBeDefined();
  });

  
});