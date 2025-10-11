
import { describe, it, expect } from 'vitest';
import { SierpinskiTriangleNode } from './sierpinski-triangle.node';
import { createTestContext } from '../test-utils';

describe('SierpinskiTriangleNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      triangle: undefined
    } as any;
    const params = {
      iterations: 5,
      filled: true
    } as any;

    const result = await SierpinskiTriangleNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
