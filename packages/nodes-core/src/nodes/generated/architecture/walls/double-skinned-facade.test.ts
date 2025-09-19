
import { describe, it, expect } from 'vitest';
import { DoubleSkinnedFacadeNode } from './doubleskinnedfacade.node';
import { createTestContext } from './../../test-utils';

describe('DoubleSkinnedFacadeNode', () => {
  it('should create DoubleSkinnedFacade', async () => {
    const context = createTestContext();
    const inputs = {
      buildingFace: null
    };
    const params = {
      cavityWidth: 600,
      ventilationType: "natural"
    };

    const result = await DoubleSkinnedFacadeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.innerSkin).toBeDefined();
    expect(result.outerSkin).toBeDefined();
    expect(result.cavity).toBeDefined();
  });

  
});