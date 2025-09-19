
import { describe, it, expect } from 'vitest';
import { FastenedNode } from './fastened.node';
import { createTestContext } from './../../test-utils';

describe('FastenedNode', () => {
  it('should create Fastened', async () => {
    const context = createTestContext();
    const inputs = {
      component1: null,
      component2: null
    };
    const params = {
      
    };

    const result = await FastenedNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.fastened).toBeDefined();
    expect(result.mate).toBeDefined();
  });

  
});