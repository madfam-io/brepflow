
import { describe, it, expect } from 'vitest';
import { ImportPLYNode } from './importply-node';
import { createTestContext } from '../test-utils';

describe('ImportPLYNode', () => {
  it('should create ImportPLY', async () => {
    const context = createTestContext();
    const inputs = {
      fileData: null
    };
    const params = {
      importColors: true,
      importProperties: true
    };

    const result = await ImportPLYNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.mesh).toBeDefined();
    expect(result.properties).toBeDefined();
  });

  
});