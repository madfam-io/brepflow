
import { describe, it, expect } from 'vitest';
import { LoftNode } from './loft.node';
import { createTestContext } from '../test-utils';

describe('LoftNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      profiles: undefined
    } as any;
    const params = {
      ruled: false,
      closed: false,
      solid: true,
      maxDegree: 3
    } as any;

    const result = await LoftNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
