
import { describe, it, expect } from 'vitest';
import { ImportIGESNode } from './import-iges.node';
import { createTestContext } from '../test-utils';

describe('ImportIGESNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      fileData: undefined
    } as any;
    const params = {
      readSurfaces: true,
      readCurves: true,
      sequence: true
    } as any;

    const result = await ImportIGESNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
