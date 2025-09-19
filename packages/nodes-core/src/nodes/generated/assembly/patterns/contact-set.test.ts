
import { describe, it, expect } from 'vitest';
import { ContactSetNode } from './contactset.node';
import { createTestContext } from './../../test-utils';

describe('ContactSetNode', () => {
  it('should create ContactSet', async () => {
    const context = createTestContext();
    const inputs = {
      faces1: null,
      faces2: null
    };
    const params = {
      type: "no_penetration",
      friction: 0.3
    };

    const result = await ContactSetNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.contactSet).toBeDefined();
  });

  
});