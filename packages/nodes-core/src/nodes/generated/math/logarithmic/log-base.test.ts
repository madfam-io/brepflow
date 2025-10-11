
import { describe, it, expect } from 'vitest';
import { LogBaseNode } from './log-base.node';
import { createTestContext } from '../test-utils';

describe('LogBaseNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      value: undefined,
      base: undefined
    } as any;
    const params = {

    } as any;

    const result = await LogBaseNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
