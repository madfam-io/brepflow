
import { describe, it, expect } from 'vitest';
import { RivetNode } from './rivet.node';
import { createTestContext } from '../test-utils';

describe('RivetNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      position: undefined
    } as any;
    const params = {
      diameter: 4,
      length: 10,
      headType: "round",
      material: "aluminum"
    } as any;

    const result = await RivetNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
