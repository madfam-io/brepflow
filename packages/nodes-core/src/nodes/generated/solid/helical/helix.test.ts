
import { describe, it, expect } from 'vitest';
import { HelixNode } from './helix.node';
import { createTestContext } from '../test-utils';

describe('HelixNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      radius: 50,
      pitch: 20,
      height: 100,
      leftHanded: false
    } as any;

    const result = await HelixNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
