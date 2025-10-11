
import { describe, it, expect } from 'vitest';
import { CelticBraidNode } from './celtic-braid.node';
import { createTestContext } from '../test-utils';

describe('CelticBraidNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      centerline: undefined
    } as any;
    const params = {
      strands: 3,
      crossings: 5
    } as any;

    const result = await CelticBraidNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
