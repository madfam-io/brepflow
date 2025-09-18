
import { describe, it, expect } from 'vitest';
import { ImageFieldNode } from './imagefield-node';
import { createTestContext } from '../test-utils';

describe('ImageFieldNode', () => {
  it('should create ImageField', async () => {
    const context = createTestContext();
    const inputs = {
      image: null
    };
    const params = {
      channel: "luminance",
      scale: [100,100],
      height: 10
    };

    const result = await ImageFieldNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.field).toBeDefined();
  });

  
});