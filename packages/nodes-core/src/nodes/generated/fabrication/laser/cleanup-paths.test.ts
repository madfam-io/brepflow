
import { describe, it, expect } from 'vitest';
import { CleanupPathsNode } from './cleanuppaths.node';
import { createTestContext } from './../../test-utils';

describe('CleanupPathsNode', () => {
  it('should create CleanupPaths', async () => {
    const context = createTestContext();
    const inputs = {
      paths: null
    };
    const params = {
      tolerance: 0.01,
      removeDoubles: true
    };

    const result = await CleanupPathsNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.cleanPaths).toBeDefined();
  });

  
});