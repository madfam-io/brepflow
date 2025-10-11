
import { describe, it, expect } from 'vitest';
import { RemapNode } from './remap.node';
import { createTestContext } from '../test-utils';

describe('RemapNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      value: undefined,
      fromMin: undefined,
      fromMax: undefined,
      toMin: undefined,
      toMax: undefined
    } as any;
    const params = {

    } as any;

    const result = await RemapNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
