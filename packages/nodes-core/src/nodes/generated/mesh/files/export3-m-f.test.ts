
import { describe, it, expect } from 'vitest';
import { Export3MFNode } from './export3-m-f.node';
import { createTestContext } from './../../test-utils';

describe('Export3MFNode', () => {
  it('should create Export3MF', async () => {
    const context = createTestContext();
    const inputs = {
      mesh: null
    };
    const params = {
      includeColors: true,
      includeMaterials: true,
      includeMetadata: true
    };

    const result = await Export3MFNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.file3MF).toBeDefined();
  });

  
});