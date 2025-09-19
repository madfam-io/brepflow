
import { describe, it, expect } from 'vitest';
import { MinimalSurfaceNode } from './minimalsurface.node';
import { createTestContext } from './../../test-utils';

describe('MinimalSurfaceNode', () => {
  it('should create MinimalSurface', async () => {
    const context = createTestContext();
    const inputs = {
      box: null
    };
    const params = {
      type: "gyroid",
      period: 10
    };

    const result = await MinimalSurfaceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.surface).toBeDefined();
  });

  
});