
import { describe, it, expect } from 'vitest';
import { SpringNode } from './spring.node';
import { createTestContext } from '../test-utils';

describe('SpringNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      radius: 50,
      pitch: 20,
      height: 100,
      wireRadius: 5,
      leftHanded: false
    } as any;

    const result = await SpringNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
