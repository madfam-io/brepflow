
import { describe, it, expect } from 'vitest';
import { GearNode } from './gear.node';
import { createTestContext } from '../test-utils';

describe('GearNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      gear1: undefined,
      gear2: undefined
    } as any;
    const params = {
      ratio: 1,
      reverse: false
    } as any;

    const result = await GearNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
