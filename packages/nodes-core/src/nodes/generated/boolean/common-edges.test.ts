
import { describe, it, expect } from 'vitest';
import { CommonEdgesNode } from './common-edges.node';
import { createTestContext } from '../test-utils';

describe('CommonEdgesNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shape1: undefined,
      shape2: undefined
    } as any;
    const params = {

    } as any;

    const result = await CommonEdgesNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
