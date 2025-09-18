
import { describe, it, expect } from 'vitest';
import { FieldScaleNode } from './fieldscale-node';
import { createTestContext } from '../test-utils';

describe('FieldScaleNode', () => {
  it('should create FieldScale', async () => {
    const context = createTestContext();
    const inputs = {
      geometry: null,
      field: null
    };
    const params = {
      minScale: 0.5,
      maxScale: 2
    };

    const result = await FieldScaleNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.scaled).toBeDefined();
  });

  
});