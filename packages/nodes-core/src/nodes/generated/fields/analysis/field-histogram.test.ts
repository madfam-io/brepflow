
import { describe, it, expect } from 'vitest';
import { FieldHistogramNode } from './field-histogram.node';
import { createTestContext } from '../test-utils';

describe('FieldHistogramNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      bins: 20
    } as any;

    const result = await FieldHistogramNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
