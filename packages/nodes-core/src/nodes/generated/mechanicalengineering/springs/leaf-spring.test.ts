
import { describe, it, expect } from 'vitest';
import { LeafSpringNode } from './leafspring-node';
import { createTestContext } from '../test-utils';

describe('LeafSpringNode', () => {
  it('should create LeafSpring', async () => {
    const context = createTestContext();
    const inputs = {
      center: /* test value */
    };
    const params = {
      leafCount: 5,
      length: 500,
      width: 50,
      thickness: 6,
      camber: 50
    };

    const result = await LeafSpringNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.assembly).toBeDefined();
    expect(result.leaves).toBeDefined();
  });

  
});