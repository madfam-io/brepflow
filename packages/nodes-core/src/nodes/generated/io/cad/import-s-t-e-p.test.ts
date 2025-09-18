
import { describe, it, expect } from 'vitest';
import { ImportSTEPNode } from './importstep-node';
import { createTestContext } from '../test-utils';

describe('ImportSTEPNode', () => {
  it('should create ImportSTEP', async () => {
    const context = createTestContext();
    const inputs = {
      fileData: null
    };
    const params = {
      readColors: true,
      readNames: true,
      readLayers: true,
      preferBrep: true
    };

    const result = await ImportSTEPNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shape).toBeDefined();
    expect(result.metadata).toBeDefined();
  });

  
});