
import { describe, it, expect } from 'vitest';
import { FastenedNode } from './fastened.node';
import { createTestContext } from '../test-utils';

describe('FastenedNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      component1: undefined,
      component2: undefined
    } as any;
    const params = {

    } as any;

    const result = await FastenedNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
