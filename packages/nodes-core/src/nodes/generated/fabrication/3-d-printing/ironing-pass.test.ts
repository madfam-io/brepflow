
import { describe, it, expect } from 'vitest';
import { IroningPassNode } from './ironing-pass.node';
import { createTestContext } from '../test-utils';

describe('IroningPassNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      topSurfaces: undefined
    } as any;
    const params = {
      ironingSpeed: 20,
      flowRate: 0.1
    } as any;

    const result = await IroningPassNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
