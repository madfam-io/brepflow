
import { describe, it, expect } from 'vitest';
import { CelticKnotNode } from './celtic-knot.node';
import { createTestContext } from '../test-utils';

describe('CelticKnotNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      path: undefined
    } as any;
    const params = {
      type: "trinity",
      width: 2
    } as any;

    const result = await CelticKnotNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
