
import { describe, it, expect } from 'vitest';
import { ShapeDescriptorNode } from './shapedescriptor-node';
import { createTestContext } from '../test-utils';

describe('ShapeDescriptorNode', () => {
  it('should create ShapeDescriptor', async () => {
    const context = createTestContext();
    const inputs = {
      shape: null
    };
    const params = {
      descriptor: "moments",
      resolution: 32,
      normalize: true
    };

    const result = await ShapeDescriptorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.descriptor).toBeDefined();
    expect(result.features).toBeDefined();
    expect(result.similarity).toBeDefined();
  });

  
});