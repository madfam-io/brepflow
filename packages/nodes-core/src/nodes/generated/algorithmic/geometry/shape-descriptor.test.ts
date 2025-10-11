
import { describe, it, expect } from 'vitest';
import { ShapeDescriptorNode } from './shape-descriptor.node';
import { createTestContext } from '../test-utils';

describe('ShapeDescriptorNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shape: undefined
    } as any;
    const params = {
      descriptor: "moments",
      resolution: 32,
      normalize: true
    } as any;

    const result = await ShapeDescriptorNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
