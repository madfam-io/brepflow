
import { describe, it, expect } from 'vitest';
import { StringCaseNode } from './stringcase-node';
import { createTestContext } from '../test-utils';

describe('StringCaseNode', () => {
  it('should create StringCase', async () => {
    const context = createTestContext();
    const inputs = {
      string: /* test value */
    };
    const params = {
      case: "lower"
    };

    const result = await StringCaseNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});