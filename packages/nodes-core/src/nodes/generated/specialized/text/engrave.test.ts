
import { describe, it, expect } from 'vitest';
import { EngraveNode } from './engrave.node';
import { createTestContext } from './../../test-utils';

describe('EngraveNode', () => {
  it('should create Engrave', async () => {
    const context = createTestContext();
    const inputs = {
      targetFace: null,
      pattern: null
    };
    const params = {
      depth: 1,
      angle: 45,
      roundCorners: true
    };

    const result = await EngraveNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.engraved).toBeDefined();
  });

  
});