
import { describe, it, expect } from 'vitest';
import { IroningPassNode } from './ironingpass-node';
import { createTestContext } from '../test-utils';

describe('IroningPassNode', () => {
  it('should create IroningPass', async () => {
    const context = createTestContext();
    const inputs = {
      topSurfaces: null
    };
    const params = {
      ironingSpeed: 20,
      flowRate: 0.1
    };

    const result = await IroningPassNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.ironingPaths).toBeDefined();
  });

  
});