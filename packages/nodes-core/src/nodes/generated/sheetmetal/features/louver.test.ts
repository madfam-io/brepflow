
import { describe, it, expect } from 'vitest';
import { LouverNode } from './louver.node';
import { createTestContext } from './../../test-utils';

describe('LouverNode', () => {
  it('should create Louver', async () => {
    const context = createTestContext();
    const inputs = {
      sheet: null,
      position: null,
      direction: null
    };
    const params = {
      louverLength: 30,
      louverWidth: 5,
      louverHeight: 5,
      louverAngle: 45
    };

    const result = await LouverNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});