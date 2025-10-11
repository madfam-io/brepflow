
import { describe, it, expect } from 'vitest';
import { EngraveNode } from './engrave.node';
import { createTestContext } from '../test-utils';

describe('EngraveNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      targetFace: undefined,
      pattern: undefined
    } as any;
    const params = {
      depth: 1,
      angle: 45,
      roundCorners: true
    } as any;

    const result = await EngraveNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
