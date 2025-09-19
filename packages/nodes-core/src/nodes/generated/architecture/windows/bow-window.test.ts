
import { describe, it, expect } from 'vitest';
import { BowWindowNode } from './bowwindow.node';
import { createTestContext } from './../../test-utils';

describe('BowWindowNode', () => {
  it('should create BowWindow', async () => {
    const context = createTestContext();
    const inputs = {
      wallOpening: null
    };
    const params = {
      projection: 600,
      segments: 5
    };

    const result = await BowWindowNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.bowWindow).toBeDefined();
  });

  
});