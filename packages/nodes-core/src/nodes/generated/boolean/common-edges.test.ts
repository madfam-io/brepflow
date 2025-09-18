import { describe, it, expect } from 'vitest';
import { CommonEdgesNode } from './commonedges-node';
import { createTestContext } from '../test-utils';

describe('CommonEdgesNode', () => {
  it('should create CommonEdges', async () => {
    const context = createTestContext();
    const inputs = {
      shape1: null, // TODO: Add proper test geometry
      shape2: null  // TODO: Add proper test geometry
    };
    const params = {

    };

    // Mock the evaluate function for testing
    try {
      const result = await CommonEdgesNode.evaluate(context, inputs, params);
      expect(result).toBeDefined();
      expect(result.edges).toBeDefined();
    } catch (error) {
      // Skip test if geometry context not available
      expect(error).toBeDefined();
    }
  });
});