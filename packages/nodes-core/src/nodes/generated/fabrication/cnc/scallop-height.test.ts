
import { describe, it, expect } from 'vitest';
import { ScallopHeightNode } from './scallop-height.node';
import { createTestContext } from '../test-utils';

describe('ScallopHeightNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      surface: undefined
    } as any;
    const params = {
      ballRadius: 3,
      stepover: 1
    } as any;

    const result = await ScallopHeightNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
