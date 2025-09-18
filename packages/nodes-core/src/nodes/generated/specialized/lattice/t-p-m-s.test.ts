
import { describe, it, expect } from 'vitest';
import { TPMSNode } from './tpms-node';
import { createTestContext } from '../test-utils';

describe('TPMSNode', () => {
  it('should create TPMS', async () => {
    const context = createTestContext();
    const inputs = {
      boundingBox: /* test value */
    };
    const params = {
      type: "gyroid",
      period: 20,
      thickness: 1,
      level: 0
    };

    const result = await TPMSNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.tpms).toBeDefined();
  });

  
});