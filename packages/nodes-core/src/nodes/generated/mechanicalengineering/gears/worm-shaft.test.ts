
import { describe, it, expect } from 'vitest';
import { WormShaftNode } from './worm-shaft.node';
import { createTestContext } from '../test-utils';

describe('WormShaftNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      axis: undefined
    } as any;
    const params = {
      module: 2,
      starts: 1,
      length: 50,
      leadAngle: 5
    } as any;

    const result = await WormShaftNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
