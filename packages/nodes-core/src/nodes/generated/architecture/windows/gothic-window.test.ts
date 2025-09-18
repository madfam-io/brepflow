
import { describe, it, expect } from 'vitest';
import { GothicWindowNode } from './gothicwindow-node';
import { createTestContext } from '../test-utils';

describe('GothicWindowNode', () => {
  it('should create GothicWindow', async () => {
    const context = createTestContext();
    const inputs = {
      opening: /* test value */
    };
    const params = {
      style: "equilateral",
      tracery: true
    };

    const result = await GothicWindowNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.gothicWindow).toBeDefined();
    expect(result.tracery).toBeDefined();
  });

  
});