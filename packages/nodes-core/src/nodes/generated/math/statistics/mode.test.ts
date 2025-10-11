
import { describe, it, expect } from 'vitest';
import { ModeNode } from './mode.node';
import { createTestContext } from '../test-utils';

describe('ModeNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      values: undefined
    } as any;
    const params = {

    } as any;

    const result = await ModeNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
