
import { describe, it, expect } from 'vitest';
import { PipeNode } from './pipe.node';
import { createTestContext } from '../test-utils';

describe('PipeNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      outerRadius: 50,
      innerRadius: 40,
      height: 100
    } as any;

    const result = await PipeNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
