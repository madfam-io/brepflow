
import { describe, it, expect } from 'vitest';
import { RatchetMechanismNode } from './ratchetmechanism.node';
import { createTestContext } from './../../test-utils';

describe('RatchetMechanismNode', () => {
  it('should create RatchetMechanism', async () => {
    const context = createTestContext();
    const inputs = {
      center: null
    };
    const params = {
      wheelDiameter: 50,
      teeth: 24,
      pawlLength: 20,
      springTension: 5
    };

    const result = await RatchetMechanismNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.assembly).toBeDefined();
    expect(result.wheel).toBeDefined();
    expect(result.pawl).toBeDefined();
  });

  
});