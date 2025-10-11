
import { describe, it, expect } from 'vitest';
import { GravityAttractorNode } from './gravity-attractor.node';
import { createTestContext } from '../test-utils';

describe('GravityAttractorNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      bodies: undefined
    } as any;
    const params = {
      mass: 100,
      G: 1
    } as any;

    const result = await GravityAttractorNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
