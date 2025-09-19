
import { describe, it, expect } from 'vitest';
import { SVGImportNode } from './svgimport.node';
import { createTestContext } from './../../test-utils';

describe('SVGImportNode', () => {
  it('should create SVGImport', async () => {
    const context = createTestContext();
    const inputs = {
      filePath: null
    };
    const params = {
      scale: 1,
      tolerance: 0.1,
      flatten: true
    };

    const result = await SVGImportNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.curves).toBeDefined();
    expect(result.closed).toBeDefined();
    expect(result.open).toBeDefined();
  });

  
});