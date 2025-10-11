
import { describe, it, expect } from 'vitest';
import { AverageNode } from './average.node';
import { createTestContext } from '../test-utils';

describe('AverageNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      values: undefined
    } as any;
    const params = {

    } as any;

    const result = await AverageNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
