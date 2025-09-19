
import { describe, it, expect } from 'vitest';
import { FieldFluxNode } from './fieldflux.node';
import { createTestContext } from './../../test-utils';

describe('FieldFluxNode', () => {
  it('should create FieldFlux', async () => {
    const context = createTestContext();
    const inputs = {
      surface: null
    };
    const params = {
      
    };

    const result = await FieldFluxNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.flux).toBeDefined();
  });

  
});