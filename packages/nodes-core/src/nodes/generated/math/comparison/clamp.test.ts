
import { describe, it, expect } from 'vitest';
import { ClampNode } from './clamp.node';
import { createTestContext } from '../test-utils';

describe('ClampNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      value: undefined,
      min: undefined,
      max: undefined
    } as any;
    const params = {

    } as any;

    const result = await ClampNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
