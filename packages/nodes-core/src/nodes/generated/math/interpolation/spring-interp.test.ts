
import { describe, it, expect } from 'vitest';
import { SpringInterpNode } from './springinterp-node';
import { createTestContext } from '../test-utils';

describe('SpringInterpNode', () => {
  it('should create SpringInterp', async () => {
    const context = createTestContext();
    const inputs = {
      current: null,
      target: null,
      velocity: null,
      deltaTime: null
    };
    const params = {
      stiffness: 100,
      damping: 10
    };

    const result = await SpringInterpNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.position).toBeDefined();
    expect(result.velocity).toBeDefined();
  });

  
});