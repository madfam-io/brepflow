
import { describe, it, expect } from 'vitest';
import { EaseInNode } from './ease-in.node';
import { createTestContext } from '../test-utils';

describe('EaseInNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      t: undefined
    } as any;
    const params = {
      power: 2
    } as any;

    const result = await EaseInNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
