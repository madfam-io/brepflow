
import { describe, it, expect } from 'vitest';
import { ImportBREPNode } from './importbrep-node';
import { createTestContext } from '../test-utils';

describe('ImportBREPNode', () => {
  it('should create ImportBREP', async () => {
    const context = createTestContext();
    const inputs = {
      fileData: null
    };
    const params = {
      version: "auto"
    };

    const result = await ImportBREPNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shape).toBeDefined();
  });

  
});