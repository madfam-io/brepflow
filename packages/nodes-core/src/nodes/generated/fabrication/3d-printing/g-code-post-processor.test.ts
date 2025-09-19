
import { describe, it, expect } from 'vitest';
import { GCodePostProcessorNode } from './gcodepostprocessor.node';
import { createTestContext } from './../../test-utils';

describe('GCodePostProcessorNode', () => {
  it('should create GCodePostProcessor', async () => {
    const context = createTestContext();
    const inputs = {
      toolpaths: null
    };
    const params = {
      flavor: "marlin",
      optimize: true
    };

    const result = await GCodePostProcessorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.gcode).toBeDefined();
  });

  
});