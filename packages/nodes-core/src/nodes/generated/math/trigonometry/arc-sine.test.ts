
import { describe, it, expect } from 'vitest';
import { ArcSineNode } from './arc-sine.node';
import { createTestContext } from '../test-utils';

describe('ArcSineNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      value: undefined
    } as any;
    const params = {
      angleUnit: "radians"
    } as any;

    const result = await ArcSineNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
