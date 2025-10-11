
import { describe, it, expect } from 'vitest';
import { BeltNode } from './belt.node';
import { createTestContext } from '../test-utils';

describe('BeltNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      pulley1: undefined,
      pulley2: undefined
    } as any;
    const params = {
      ratio: 1
    } as any;

    const result = await BeltNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
