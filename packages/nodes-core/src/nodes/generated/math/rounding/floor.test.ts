
import { describe, it, expect } from 'vitest';
import { FloorNode } from './floor-node';
import { createTestContext } from '../test-utils';

describe('FloorNode', () => {
  it('should create Floor', async () => {
    const context = createTestContext();
    const inputs = {
      value: /* test value */
    };
    const params = {
      
    };

    const result = await FloorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});