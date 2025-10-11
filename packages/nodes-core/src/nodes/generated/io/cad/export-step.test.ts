
import { describe, it, expect } from 'vitest';
import { ExportSTEPNode } from './export-step.node';
import { createTestContext } from '../test-utils';

describe('ExportSTEPNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shape: undefined
    } as any;
    const params = {
      version: "AP214",
      writeColors: true,
      writeNames: true,
      writeLayers: true,
      units: "mm"
    } as any;

    const result = await ExportSTEPNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
