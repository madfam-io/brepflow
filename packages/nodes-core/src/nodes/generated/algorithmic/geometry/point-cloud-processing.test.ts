
import { describe, it, expect } from 'vitest';
import { PointCloudProcessingNode } from './point-cloud-processing.node';
import { createTestContext } from '../test-utils';

describe('PointCloudProcessingNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      points: undefined
    } as any;
    const params = {
      operation: "filter",
      radius: 1,
      neighbors: 6
    } as any;

    const result = await PointCloudProcessingNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
