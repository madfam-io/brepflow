
import { describe, it, expect } from 'vitest';
import { BeadNode } from './bead.node';
import { createTestContext } from './../../test-utils';

describe('BeadNode', () => {
  it('should create Bead', async () => {
    const context = createTestContext();
    const inputs = {
      sheet: null,
      path: null
    };
    const params = {
      beadWidth: 10,
      beadHeight: 3,
      beadProfile: "U"
    };

    const result = await BeadNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});