
import { describe, it, expect } from 'vitest';
import { MetaBallsNode } from './metaballs-node';
import { createTestContext } from '../test-utils';

describe('MetaBallsNode', () => {
  it('should create MetaBalls', async () => {
    const context = createTestContext();
    const inputs = {
      centers: null,
      radii: null
    };
    const params = {
      threshold: 1,
      resolution: 50
    };

    const result = await MetaBallsNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.metaball).toBeDefined();
  });

  
});