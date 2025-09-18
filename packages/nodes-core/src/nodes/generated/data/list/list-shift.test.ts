
import { describe, it, expect } from 'vitest';
import { ListShiftNode } from './listshift-node';
import { createTestContext } from '../test-utils';

describe('ListShiftNode', () => {
  it('should create ListShift', async () => {
    const context = createTestContext();
    const inputs = {
      list: null,
      offset: null
    };
    const params = {
      wrap: true
    };

    const result = await ListShiftNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shifted).toBeDefined();
  });

  
});