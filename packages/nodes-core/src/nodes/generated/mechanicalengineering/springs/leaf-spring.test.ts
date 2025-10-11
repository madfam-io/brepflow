
import { describe, it, expect } from 'vitest';
import { LeafSpringNode } from './leaf-spring.node';
import { createTestContext } from '../test-utils';

describe('LeafSpringNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      center: undefined
    } as any;
    const params = {
      leafCount: 5,
      length: 500,
      width: 50,
      thickness: 6,
      camber: 50
    } as any;

    const result = await LeafSpringNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
