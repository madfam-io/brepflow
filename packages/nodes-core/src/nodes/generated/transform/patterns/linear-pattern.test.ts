
import { describe, it, expect } from 'vitest';
import { LinearPatternNode } from './linear-pattern.node';
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

    await expect(LinearPatternNode.evaluate(context, inputs, params))
      .rejects.toThrow('LinearPattern not yet implemented');
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

    await expect(LinearPatternNode.evaluate(context, {}, params))
      .rejects.toThrow('LinearPattern not yet implemented');
  });
  
  it('should handle Centered Array', async () => {
    const context = createTestContext();
    const params = {
      "count": 7,
      "spacing": 25,
      "centered": true
    };

    await expect(LinearPatternNode.evaluate(context, {}, params))
      .rejects.toThrow('LinearPattern not yet implemented');
  });
});
