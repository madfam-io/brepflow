
import { describe, it, expect } from 'vitest';
import { ImportParasolidNode } from './importparasolid-node';
import { createTestContext } from '../test-utils';

describe('ImportParasolidNode', () => {
  it('should create ImportParasolid', async () => {
    const context = createTestContext();
    const inputs = {
      fileData: /* test value */
    };
    const params = {
      healGeometry: true,
      simplifyGeometry: false
    };

    const result = await ImportParasolidNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shape).toBeDefined();
  });

  
});