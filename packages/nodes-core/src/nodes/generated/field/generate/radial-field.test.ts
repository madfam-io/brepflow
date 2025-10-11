
import { describe, it, expect } from 'vitest';
import { RadialFieldNode } from './radial-field.node';
import { createTestContext } from '../test-utils';

describe('RadialFieldNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      center: undefined
    } as any;
    const params = {
      falloff: "linear",
      radius: 100,
      strength: 1
    } as any;

    const result = await RadialFieldNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
