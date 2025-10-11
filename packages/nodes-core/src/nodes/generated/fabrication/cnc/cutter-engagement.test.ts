
import { describe, it, expect } from 'vitest';
import { CutterEngagementNode } from './cutter-engagement.node';
import { createTestContext } from '../test-utils';

describe('CutterEngagementNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      toolpath: undefined,
      stock: undefined
    } as any;
    const params = {
      toolDiameter: 10
    } as any;

    const result = await CutterEngagementNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
