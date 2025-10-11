
import { describe, it, expect } from 'vitest';
import { CosineNode } from './cosine.node';
import { createTestContext } from '../test-utils';

describe('CosineNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      angle: undefined
    } as any;
    const params = {
      angleUnit: "radians"
    } as any;

    const result = await CosineNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
