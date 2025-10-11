
import { describe, it, expect } from 'vitest';
import { SpringInterpNode } from './spring-interp.node';
import { createTestContext } from '../test-utils';

describe('SpringInterpNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      current: undefined,
      target: undefined,
      velocity: undefined,
      deltaTime: undefined
    } as any;
    const params = {
      stiffness: 100,
      damping: 10
    } as any;

    const result = await SpringInterpNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
