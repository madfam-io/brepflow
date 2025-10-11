
import { describe, it, expect } from 'vitest';
import { CurveLengthNode } from './curve-length.node';
import { createTestContext } from '../test-utils';

describe('CurveLengthNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      curve: undefined
    } as any;
    const params = {
      tolerance: 0.01,
      segments: 100
    } as any;

    const result = await CurveLengthNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
