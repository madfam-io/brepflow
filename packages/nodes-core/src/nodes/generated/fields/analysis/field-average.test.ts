
import { describe, it, expect } from 'vitest';
import { FieldAverageNode } from './field-average.node';
import { createTestContext } from '../test-utils';

describe('FieldAverageNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      sampleCount: 1000
    } as any;

    const result = await FieldAverageNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
