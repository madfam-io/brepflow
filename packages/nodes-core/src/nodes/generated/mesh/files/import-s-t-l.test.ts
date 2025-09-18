
import { describe, it, expect } from 'vitest';
import { ImportSTLNode } from './importstl-node';
import { createTestContext } from '../test-utils';

describe('ImportSTLNode', () => {
  it('should create ImportSTL', async () => {
    const context = createTestContext();
    const inputs = {
      fileData: /* test value */
    };
    const params = {
      units: "mm",
      validate: true
    };

    const result = await ImportSTLNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.mesh).toBeDefined();
    expect(result.isValid).toBeDefined();
  });

  
});