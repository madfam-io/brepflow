
import { describe, it, expect } from 'vitest';
import { ImportParasolidNode } from './import-parasolid.node';
import { createTestContext } from '../test-utils';

describe('ImportParasolidNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      fileData: undefined
    } as any;
    const params = {
      healGeometry: true,
      simplifyGeometry: false
    } as any;

    const result = await ImportParasolidNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
