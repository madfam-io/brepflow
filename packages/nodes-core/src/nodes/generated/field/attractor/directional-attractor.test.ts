
import { describe, it, expect } from 'vitest';
import { DirectionalAttractorNode } from './directional-attractor.node';
import { createTestContext } from '../test-utils';

describe('DirectionalAttractorNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      origin: undefined
    } as any;
    const params = {
      direction: [1,0,0],
      strength: 1,
      spread: 45
    } as any;

    const result = await DirectionalAttractorNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
