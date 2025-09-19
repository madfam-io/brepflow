
import { describe, it, expect } from 'vitest';
import { CompressionSpringNode } from './compressionspring.node';
import { createTestContext } from './../../test-utils';

describe('CompressionSpringNode', () => {
  it('should create CompressionSpring', async () => {
    const context = createTestContext();
    const inputs = {
      center: null
    };
    const params = {
      wireDiameter: 2,
      coilDiameter: 20,
      freeLength: 50,
      coils: 8,
      endType: "closed"
    };

    const result = await CompressionSpringNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.spring).toBeDefined();
    expect(result.helix).toBeDefined();
  });

  
});