
import { describe, it, expect } from 'vitest';
import { BayWindowNode } from './baywindow.node';
import { createTestContext } from './../../test-utils';

describe('BayWindowNode', () => {
  it('should create BayWindow', async () => {
    const context = createTestContext();
    const inputs = {
      wallOpening: null
    };
    const params = {
      projection: 600,
      angleCount: 3,
      centerAngle: 135
    };

    const result = await BayWindowNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.bayWindow).toBeDefined();
    expect(result.windows).toBeDefined();
  });

  
});