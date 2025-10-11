
import { describe, it, expect } from 'vitest';
import { PathNode } from './path.node';
import { createTestContext } from '../test-utils';

describe('PathNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      path: undefined,
      follower: undefined
    } as any;
    const params = {
      position: 0,
      tangent: true
    } as any;

    const result = await PathNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
