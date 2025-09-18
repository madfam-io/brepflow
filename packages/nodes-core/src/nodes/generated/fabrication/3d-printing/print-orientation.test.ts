
import { describe, it, expect } from 'vitest';
import { PrintOrientationNode } from './printorientation-node';
import { createTestContext } from '../test-utils';

describe('PrintOrientationNode', () => {
  it('should create PrintOrientation', async () => {
    const context = createTestContext();
    const inputs = {
      model: null
    };
    const params = {
      optimize: "support",
      constraints: false
    };

    const result = await PrintOrientationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.orientation).toBeDefined();
    expect(result.orientedModel).toBeDefined();
  });

  
});