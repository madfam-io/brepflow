
import { describe, it, expect } from 'vitest';
import { OffsetNode } from './offset-node';
import { createTestContext } from '../test-utils';

describe('OffsetNode', () => {
  it('should create Offset', async () => {
    const context = createTestContext();
    const inputs = {
      curve: null
    };
    const params = {
      distance: 10,
      side: "right"
    };

    const result = await OffsetNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.offset).toBeDefined();
  });

  
});