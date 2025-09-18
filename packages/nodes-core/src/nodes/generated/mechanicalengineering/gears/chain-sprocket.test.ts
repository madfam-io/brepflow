
import { describe, it, expect } from 'vitest';
import { ChainSprocketNode } from './chainsprocket-node';
import { createTestContext } from '../test-utils';

describe('ChainSprocketNode', () => {
  it('should create ChainSprocket', async () => {
    const context = createTestContext();
    const inputs = {
      center: null
    };
    const params = {
      chainPitch: 12.7,
      teeth: 18,
      rollerDiameter: 7.92,
      width: 7.85
    };

    const result = await ChainSprocketNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.sprocket).toBeDefined();
    expect(result.pitchCircle).toBeDefined();
  });

  
});