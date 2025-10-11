
import { describe, it, expect } from 'vitest';
import { EaseInOutNode } from './ease-in-out.node';
import { createTestContext } from '../test-utils';

describe('EaseInOutNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      t: undefined
    } as any;
    const params = {
      power: 2
    } as any;

    const result = await EaseInOutNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
