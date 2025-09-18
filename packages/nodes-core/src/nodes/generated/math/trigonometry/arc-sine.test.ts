
import { describe, it, expect } from 'vitest';
import { ArcSineNode } from './arcsine-node';
import { createTestContext } from '../test-utils';

describe('ArcSineNode', () => {
  it('should create ArcSine', async () => {
    const context = createTestContext();
    const inputs = {
      value: null
    };
    const params = {
      angleUnit: "radians"
    };

    const result = await ArcSineNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.angle).toBeDefined();
  });

  
});