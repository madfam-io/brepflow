
import { describe, it, expect } from 'vitest';
import { MultiMaterialSetupNode } from './multimaterialsetup-node';
import { createTestContext } from '../test-utils';

describe('MultiMaterialSetupNode', () => {
  it('should create MultiMaterialSetup', async () => {
    const context = createTestContext();
    const inputs = {
      regions: null
    };
    const params = {
      materials: 2,
      purgeVolume: 50
    };

    const result = await MultiMaterialSetupNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.materialAssignment).toBeDefined();
    expect(result.purgeBlock).toBeDefined();
  });

  
});