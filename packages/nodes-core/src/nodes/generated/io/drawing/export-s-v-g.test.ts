
import { describe, it, expect } from 'vitest';
import { ExportSVGNode } from './exportsvg.node';
import { createTestContext } from './../../test-utils';

describe('ExportSVGNode', () => {
  it('should create ExportSVG', async () => {
    const context = createTestContext();
    const inputs = {
      shapes: null
    };
    const params = {
      projection: "top",
      width: 800,
      height: 600,
      strokeWidth: 1,
      fillOpacity: 0.3
    };

    const result = await ExportSVGNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.svgData).toBeDefined();
  });

  
});