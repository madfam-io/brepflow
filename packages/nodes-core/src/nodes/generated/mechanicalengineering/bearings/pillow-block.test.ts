
import { describe, it, expect } from 'vitest';
import { PillowBlockNode } from './pillow-block.node';
import { createTestContext } from '../test-utils';

describe('PillowBlockNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      position: undefined
    } as any;
    const params = {
      shaftDiameter: 20,
      mountingHoles: 2,
      baseWidth: 80,
      height: 50
    } as any;

    const result = await PillowBlockNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
