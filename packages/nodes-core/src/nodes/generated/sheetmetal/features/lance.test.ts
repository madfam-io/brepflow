
import { describe, it, expect } from 'vitest';
import { LanceNode } from './lance-node';
import { createTestContext } from '../test-utils';

describe('LanceNode', () => {
  it('should create Lance', async () => {
    const context = createTestContext();
    const inputs = {
      sheet: /* test value */,
      sketch: /* test value */
    };
    const params = {
      lanceLength: 20,
      lanceWidth: 5,
      lanceHeight: 3,
      lanceAngle: 30
    };

    const result = await LanceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});