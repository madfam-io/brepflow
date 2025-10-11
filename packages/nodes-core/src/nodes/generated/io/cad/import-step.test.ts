
import { describe, it, expect } from 'vitest';
import { ImportSTEPNode } from './import-step.node';
import { createTestContext } from '../test-utils';

describe('ImportSTEPNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      fileData: undefined
    } as any;
    const params = {
      readColors: true,
      readNames: true,
      readLayers: true,
      preferBrep: true
    } as any;

    const result = await ImportSTEPNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
