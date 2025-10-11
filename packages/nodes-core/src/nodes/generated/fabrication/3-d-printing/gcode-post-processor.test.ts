
import { describe, it, expect } from 'vitest';
import { GCodePostProcessorNode } from './gcode-post-processor.node';
import { createTestContext } from '../test-utils';

describe('GCodePostProcessorNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      toolpaths: undefined
    } as any;
    const params = {
      flavor: "marlin",
      optimize: true
    } as any;

    const result = await GCodePostProcessorNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
