
import { describe, it, expect } from 'vitest';
import { AddNode } from './add.node';
import { createTestContext } from '../test-utils';

describe('AddNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      a: undefined,
      b: undefined
    } as any;
    const params = {

    } as any;

    const result = await AddNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
