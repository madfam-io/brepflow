
import { describe, it, expect } from 'vitest';
import { CurvedWallNode } from './curvedwall-node';
import { createTestContext } from '../test-utils';

describe('CurvedWallNode', () => {
  it('should create CurvedWall', async () => {
    const context = createTestContext();
    const inputs = {
      curve: null
    };
    const params = {
      height: 3000,
      thickness: 200,
      segments: 10
    };

    const result = await CurvedWallNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.wall).toBeDefined();
  });

  
});