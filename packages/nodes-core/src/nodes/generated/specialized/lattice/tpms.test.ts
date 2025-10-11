
import { describe, it, expect } from 'vitest';
import { TPMSNode } from './tpms.node';
import { createTestContext } from '../test-utils';

describe('TPMSNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      boundingBox: undefined
    } as any;
    const params = {
      type: "gyroid",
      period: 20,
      thickness: 1,
      level: 0
    } as any;

    const result = await TPMSNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
