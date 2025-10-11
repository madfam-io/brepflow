
import { describe, it, expect } from 'vitest';
import { CeilingNode } from './ceiling.node';
import { createTestContext } from '../test-utils';

describe('CeilingNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      value: undefined
    } as any;
    const params = {

    } as any;

    const result = await CeilingNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
