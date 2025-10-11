
import { describe, it, expect } from 'vitest';
import { OrientNode } from './orient.node';
import { createTestContext } from '../test-utils';

describe('OrientNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shape: undefined,
      fromDirection: undefined,
      toDirection: undefined
    } as any;
    const params = {

    } as any;

    const result = await OrientNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
