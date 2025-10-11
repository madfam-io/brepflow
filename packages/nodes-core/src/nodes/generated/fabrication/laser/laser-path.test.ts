
import { describe, it, expect } from 'vitest';
import { LaserPathNode } from './laser-path.node';
import { createTestContext } from '../test-utils';

describe('LaserPathNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      profiles: undefined
    } as any;
    const params = {
      kerf: 0.15,
      cornerRadius: 0
    } as any;

    const result = await LaserPathNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
