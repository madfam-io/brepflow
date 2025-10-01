
import { describe, it, expect } from 'vitest';
import { CircularPatternNode } from './circular-pattern.node';
import { createTestContext } from './../../test-utils';

describe('CircularPatternNode', () => {
  it('should create CircularPattern', async () => {
    const context = createTestContext();
    const inputs = {
      shape: null
    };
    const params = {
      count: 6,
      angle: 360,
      center: [0,0,0],
      axis: [0,0,1],
      rotateInstances: true
    };

    await expect(CircularPatternNode.evaluate(context, inputs, params))
      .rejects.toThrow('CircularPattern not yet implemented');
  });

  
  it('should handle Bolt Circle', async () => {
    const context = createTestContext();
    const params = {
      "count": 8,
      "angle": 360,
      "rotateInstances": false
    };

    await expect(CircularPatternNode.evaluate(context, {}, params))
      .rejects.toThrow('CircularPattern not yet implemented');
  });
  
  it('should handle Turbine Blades', async () => {
    const context = createTestContext();
    const params = {
      "count": 24,
      "angle": 360,
      "rotateInstances": true
    };

    await expect(CircularPatternNode.evaluate(context, {}, params))
      .rejects.toThrow('CircularPattern not yet implemented');
  });
});
