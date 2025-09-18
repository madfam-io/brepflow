
import { describe, it, expect } from 'vitest';
import { ExportSTEPNode } from './exportstep-node';
import { createTestContext } from '../test-utils';

describe('ExportSTEPNode', () => {
  it('should create ExportSTEP', async () => {
    const context = createTestContext();
    const inputs = {
      shape: null
    };
    const params = {
      version: "AP214",
      writeColors: true,
      writeNames: true,
      writeLayers: true,
      units: "mm"
    };

    const result = await ExportSTEPNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.stepData).toBeDefined();
  });

  
});