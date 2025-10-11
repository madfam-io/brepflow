
import { describe, it, expect } from 'vitest';
import { GlueNode } from './glue.node';
import { createTestContext } from '../test-utils';

describe('GlueNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shapes: undefined
    } as any;
    const params = {
      tolerance: 1e-7
    } as any;

    const result = await GlueNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
