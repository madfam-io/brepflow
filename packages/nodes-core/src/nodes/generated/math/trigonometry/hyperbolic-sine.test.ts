
import { describe, it, expect } from 'vitest';
import { HyperbolicSineNode } from './hyperbolic-sine.node';
import { createTestContext } from '../test-utils';

describe('HyperbolicSineNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      value: undefined
    } as any;
    const params = {

    } as any;

    const result = await HyperbolicSineNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
