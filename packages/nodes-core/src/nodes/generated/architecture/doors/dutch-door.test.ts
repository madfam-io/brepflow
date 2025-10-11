
import { describe, it, expect } from 'vitest';
import { DutchDoorNode } from './dutch-door.node';
import { createTestContext } from '../test-utils';

describe('DutchDoorNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      opening: undefined
    } as any;
    const params = {
      splitHeight: 1050,
      topOpen: false,
      bottomOpen: false
    } as any;

    const result = await DutchDoorNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
