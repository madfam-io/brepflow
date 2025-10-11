
import { describe, it, expect } from 'vitest';
import { Fillet2DNode } from './fillet2-d.node';
import { createTestContext } from '../test-utils';

describe('Fillet2DNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      wire: undefined
    } as any;
    const params = {
      radius: 5,
      allCorners: true
    } as any;

    const result = await Fillet2DNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
