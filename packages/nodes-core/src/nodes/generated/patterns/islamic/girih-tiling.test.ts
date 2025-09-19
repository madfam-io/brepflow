
import { describe, it, expect } from 'vitest';
import { GirihTilingNode } from './girihtiling.node';
import { createTestContext } from './../../test-utils';

describe('GirihTilingNode', () => {
  it('should create GirihTiling', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      type: "pentagon",
      size: 10
    };

    const result = await GirihTilingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.tiles).toBeDefined();
    expect(result.pattern).toBeDefined();
  });

  
});