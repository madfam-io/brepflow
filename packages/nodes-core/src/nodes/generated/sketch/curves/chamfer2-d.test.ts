
import { describe, it, expect } from 'vitest';
import { Chamfer2DNode } from './chamfer2-d.node';
import { createTestContext } from '../test-utils';

describe('Chamfer2DNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      wire: undefined
    } as any;
    const params = {
      distance: 5
    } as any;

    const result = await Chamfer2DNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
