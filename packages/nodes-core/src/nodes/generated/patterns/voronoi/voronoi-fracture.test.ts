
import { describe, it, expect } from 'vitest';
import { VoronoiFractureNode } from './voronoifracture-node';
import { createTestContext } from '../test-utils';

describe('VoronoiFractureNode', () => {
  it('should create VoronoiFracture', async () => {
    const context = createTestContext();
    const inputs = {
      surface: /* test value */
    };
    const params = {
      irregularity: 0.5,
      density: 10
    };

    const result = await VoronoiFractureNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.fragments).toBeDefined();
  });

  
});