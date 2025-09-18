
import { describe, it, expect } from 'vitest';
import { SVGExportNode } from './svgexport-node';
import { createTestContext } from '../test-utils';

describe('SVGExportNode', () => {
  it('should create SVGExport', async () => {
    const context = createTestContext();
    const inputs = {
      curves: null,
      filePath: null
    };
    const params = {
      scale: 1,
      strokeWidth: 1,
      viewBox: true
    };

    const result = await SVGExportNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.success).toBeDefined();
    expect(result.dimensions).toBeDefined();
  });

  
});