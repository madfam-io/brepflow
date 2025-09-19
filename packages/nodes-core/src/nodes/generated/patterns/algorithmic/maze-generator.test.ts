
import { describe, it, expect } from 'vitest';
import { MazeGeneratorNode } from './mazegenerator.node';
import { createTestContext } from './../../test-utils';

describe('MazeGeneratorNode', () => {
  it('should create MazeGenerator', async () => {
    const context = createTestContext();
    const inputs = {
      boundary: null
    };
    const params = {
      algorithm: "recursive-backtracker",
      width: 20,
      height: 20
    };

    const result = await MazeGeneratorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.walls).toBeDefined();
    expect(result.path).toBeDefined();
  });

  
});