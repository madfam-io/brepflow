
import { describe, it, expect } from 'vitest';
import { ImportACISNode } from './importacis-node';
import { createTestContext } from '../test-utils';

describe('ImportACISNode', () => {
  it('should create ImportACIS', async () => {
    const context = createTestContext();
    const inputs = {
      fileData: null
    };
    const params = {
      version: "auto",
      healGeometry: true
    };

    const result = await ImportACISNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shape).toBeDefined();
  });

  
});