
import { describe, it, expect } from 'vitest';
import { ExplodedViewNode } from './explodedview.node';
import { createTestContext } from './../../test-utils';

describe('ExplodedViewNode', () => {
  it('should create ExplodedView', async () => {
    const context = createTestContext();
    const inputs = {
      assembly: null
    };
    const params = {
      distance: 100,
      autoSpace: true
    };

    const result = await ExplodedViewNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.exploded).toBeDefined();
    expect(result.paths).toBeDefined();
  });

  
});