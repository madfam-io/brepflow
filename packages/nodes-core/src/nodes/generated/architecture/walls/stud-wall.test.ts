
import { describe, it, expect } from 'vitest';
import { StudWallNode } from './studwall-node';
import { createTestContext } from '../test-utils';

describe('StudWallNode', () => {
  it('should create StudWall', async () => {
    const context = createTestContext();
    const inputs = {
      outline: null
    };
    const params = {
      studSpacing: 400,
      studWidth: 90,
      studDepth: 45
    };

    const result = await StudWallNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.studFrame).toBeDefined();
  });

  
});