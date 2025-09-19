
import { describe, it, expect } from 'vitest';
import { LinearPatternNode } from './linearpattern.node';
import { createTestContext } from './../../test-utils';

describe('LinearPatternNode', () => {
  it('should create LinearPattern', async () => {
    const context = createTestContext();
    const inputs = {
      shape: null
    };
    const params = {
      count: 5,
      spacing: 20,
      direction: [1,0,0],
      centered: false
    };

    const result = await LinearPatternNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shapes).toBeDefined();
    expect(result.compound).toBeDefined();
  });

  
  it('should handle Hole Pattern', async () => {
    const context = createTestContext();
    const params = {
      "count": 10,
      "spacing": 15,
      "direction": [
        1,
        0,
        0
      ]
    };

    const result = await LinearPatternNode.evaluate(context, {}, params);

    expect(result).toBeDefined();
  });
  
  it('should handle Centered Array', async () => {
    const context = createTestContext();
    const params = {
      "count": 7,
      "spacing": 25,
      "centered": true
    };

    const result = await LinearPatternNode.evaluate(context, {}, params);

    expect(result).toBeDefined();
  });
});