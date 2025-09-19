
import { describe, it, expect } from 'vitest';
import { CasementWindowNode } from './casementwindow.node';
import { createTestContext } from './../../test-utils';

describe('CasementWindowNode', () => {
  it('should create CasementWindow', async () => {
    const context = createTestContext();
    const inputs = {
      position: null
    };
    const params = {
      width: 600,
      height: 1200,
      hinge: "left",
      opening: 0
    };

    const result = await CasementWindowNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.window).toBeDefined();
    expect(result.frame).toBeDefined();
    expect(result.glass).toBeDefined();
  });

  
});