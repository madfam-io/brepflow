
import { describe, it, expect } from 'vitest';
import { CorrelationNode } from './correlation.node';
import { createTestContext } from '../test-utils';

describe('CorrelationNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      x: undefined,
      y: undefined
    } as any;
    const params = {

    } as any;

    const result = await CorrelationNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
