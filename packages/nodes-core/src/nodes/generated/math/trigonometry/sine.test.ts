
import { describe, it, expect } from 'vitest';
import { SineNode } from './sine.node';
import { createTestContext } from '../test-utils';

describe('SineNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      angle: undefined
    } as any;
    const params = {
      angleUnit: "radians"
    } as any;

    const result = await SineNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
