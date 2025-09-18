
import { describe, it, expect } from 'vitest';
import { FieldLineNode } from './fieldline-node';
import { createTestContext } from '../test-utils';

describe('FieldLineNode', () => {
  it('should create FieldLine', async () => {
    const context = createTestContext();
    const inputs = {
      field: null,
      seeds: null
    };
    const params = {
      stepSize: 1,
      maxSteps: 1000,
      direction: "forward"
    };

    const result = await FieldLineNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.lines).toBeDefined();
  });

  
});