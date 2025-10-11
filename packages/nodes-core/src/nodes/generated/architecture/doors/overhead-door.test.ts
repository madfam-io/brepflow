
import { describe, it, expect } from 'vitest';
import { OverheadDoorNode } from './overhead-door.node';
import { createTestContext } from '../test-utils';

describe('OverheadDoorNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      opening: undefined
    } as any;
    const params = {
      sections: 4,
      trackType: "standard"
    } as any;

    const result = await OverheadDoorNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
