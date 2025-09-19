
import { describe, it, expect } from 'vitest';
import { CoastingSetupNode } from './coastingsetup.node';
import { createTestContext } from './../../test-utils';

describe('CoastingSetupNode', () => {
  it('should create CoastingSetup', async () => {
    const context = createTestContext();
    const inputs = {
      extrusions: null
    };
    const params = {
      coastVolume: 0.064,
      minVolume: 0.8
    };

    const result = await CoastingSetupNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.coastingPoints).toBeDefined();
  });

  
});