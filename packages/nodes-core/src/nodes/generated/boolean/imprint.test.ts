
import { describe, it, expect } from 'vitest';
import { ImprintNode } from './imprint-node';
import { createTestContext } from '../test-utils';

describe('ImprintNode', () => {
  it('should create Imprint', async () => {
    const context = createTestContext();
    const inputs = {
      base: null,
      imprint: null
    };
    const params = {
      depth: 1
    };

    const result = await ImprintNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});