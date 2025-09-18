
import { describe, it, expect } from 'vitest';
import { CircularPatternNode } from './circularpattern-node';
import { createTestContext } from '../test-utils';

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

    const result = await CircularPatternNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shapes).toBeDefined();
    expect(result.compound).toBeDefined();
  });

  
  it('should handle Bolt Circle', async () => {
    const context = createTestContext();
    const params = {
      "count": 8,
      "angle": 360,
      "rotateInstances": false
    };

    const result = await CircularPatternNode.evaluate(context, {}, params);

    expect(result).toBeDefined();
  });
  
  it('should handle Turbine Blades', async () => {
    const context = createTestContext();
    const params = {
      "count": 24,
      "angle": 360,
      "rotateInstances": true
    };

    const result = await CircularPatternNode.evaluate(context, {}, params);

    expect(result).toBeDefined();
  });
});