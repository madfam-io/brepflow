
import { describe, it, expect } from 'vitest';
import { RackPinionNode } from './rack-pinion.node';
import { createTestContext } from '../test-utils';

describe('RackPinionNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      rack: undefined,
      pinion: undefined
    } as any;
    const params = {
      module: 1
    } as any;

    const result = await RackPinionNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
