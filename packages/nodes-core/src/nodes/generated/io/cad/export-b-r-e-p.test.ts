
import { describe, it, expect } from 'vitest';
import { ExportBREPNode } from './exportbrep-node';
import { createTestContext } from '../test-utils';

describe('ExportBREPNode', () => {
  it('should create ExportBREP', async () => {
    const context = createTestContext();
    const inputs = {
      shape: null
    };
    const params = {
      binary: false
    };

    const result = await ExportBREPNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.brepData).toBeDefined();
  });

  
});