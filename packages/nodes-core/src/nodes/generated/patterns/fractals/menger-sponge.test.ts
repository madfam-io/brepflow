
import { describe, it, expect } from 'vitest';
import { MengerSpongeNode } from './mengersponge.node';
import { createTestContext } from './../../test-utils';

describe('MengerSpongeNode', () => {
  it('should create MengerSponge', async () => {
    const context = createTestContext();
    const inputs = {
      cube: null
    };
    const params = {
      iterations: 3
    };

    const result = await MengerSpongeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.fractal).toBeDefined();
  });

  
});