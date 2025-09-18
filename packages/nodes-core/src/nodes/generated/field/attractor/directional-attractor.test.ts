
import { describe, it, expect } from 'vitest';
import { DirectionalAttractorNode } from './directionalattractor-node';
import { createTestContext } from '../test-utils';

describe('DirectionalAttractorNode', () => {
  it('should create DirectionalAttractor', async () => {
    const context = createTestContext();
    const inputs = {
      origin: /* test value */
    };
    const params = {
      direction: [1,0,0],
      strength: 1,
      spread: 45
    };

    const result = await DirectionalAttractorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.field).toBeDefined();
  });

  
});