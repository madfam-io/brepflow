
import { describe, it, expect } from 'vitest';
import { TabNode } from './tab-node';
import { createTestContext } from '../test-utils';

describe('TabNode', () => {
  it('should create Tab', async () => {
    const context = createTestContext();
    const inputs = {
      sheet: /* test value */,
      edge: /* test value */,
      position: /* test value */
    };
    const params = {
      tabWidth: 20,
      tabDepth: 10,
      tabType: "rectangular",
      cornerRadius: 2
    };

    const result = await TabNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});