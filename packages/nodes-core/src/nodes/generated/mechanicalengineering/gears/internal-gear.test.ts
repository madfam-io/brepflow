
import { describe, it, expect } from 'vitest';
import { InternalGearNode } from './internal-gear.node';
import { createTestContext } from '../test-utils';

describe('InternalGearNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      center: undefined
    } as any;
    const params = {
      module: 2,
      teeth: 60,
      rimThickness: 10,
      width: 20
    } as any;

    const result = await InternalGearNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
