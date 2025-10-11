
import { describe, it, expect } from 'vitest';
import { DoubleSkinnedFacadeNode } from './double-skinned-facade.node';
import { createTestContext } from '../test-utils';

describe('DoubleSkinnedFacadeNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      buildingFace: undefined
    } as any;
    const params = {
      cavityWidth: 600,
      ventilationType: "natural"
    } as any;

    const result = await DoubleSkinnedFacadeNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
