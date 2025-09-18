
import { describe, it, expect } from 'vitest';
import { FieldGridNode } from './fieldgrid-node';
import { createTestContext } from '../test-utils';

describe('FieldGridNode', () => {
  it('should create FieldGrid', async () => {
    const context = createTestContext();
    const inputs = {
      field: null,
      bounds: null
    };
    const params = {
      resolutionX: 10,
      resolutionY: 10,
      resolutionZ: 10
    };

    const result = await FieldGridNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.grid).toBeDefined();
    expect(result.points).toBeDefined();
    expect(result.values).toBeDefined();
  });

  
});