
import { describe, it, expect } from 'vitest';
import { RuledSurfaceNode } from './ruledsurface.node';
import { createTestContext } from './../../test-utils';

describe('RuledSurfaceNode', () => {
  it('should create RuledSurface', async () => {
    const context = createTestContext();
    const inputs = {
      curve1: null,
      curve2: null
    };
    const params = {
      
    };

    const result = await RuledSurfaceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.surface).toBeDefined();
  });

  
});