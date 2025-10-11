
import { describe, it, expect } from 'vitest';
import { GothicWindowNode } from './gothic-window.node';
import { createTestContext } from '../test-utils';

describe('GothicWindowNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      opening: undefined
    } as any;
    const params = {
      style: "equilateral",
      tracery: true
    } as any;

    const result = await GothicWindowNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
