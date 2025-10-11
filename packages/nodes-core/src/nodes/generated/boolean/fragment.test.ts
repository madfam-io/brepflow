
import { describe, it, expect } from 'vitest';
import { FragmentNode } from './fragment.node';
import { createTestContext } from '../test-utils';

describe('FragmentNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shapes: undefined
    } as any;
    const params = {

    } as any;

    const result = await FragmentNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
