
import { describe, it, expect } from 'vitest';
import { FieldLineNode } from './field-line.node';
import { createTestContext } from '../test-utils';

describe('FieldLineNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      field: undefined,
      seeds: undefined
    } as any;
    const params = {
      stepSize: 1,
      maxSteps: 1000,
      direction: "forward"
    } as any;

    const result = await FieldLineNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
