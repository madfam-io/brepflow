
import { describe, it, expect } from 'vitest';
import { ImportIGESNode } from './importiges.node';
import { createTestContext } from './../../test-utils';

describe('ImportIGESNode', () => {
  it('should create ImportIGES', async () => {
    const context = createTestContext();
    const inputs = {
      fileData: null
    };
    const params = {
      readSurfaces: true,
      readCurves: true,
      sequence: true
    };

    const result = await ImportIGESNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shape).toBeDefined();
  });

  
});