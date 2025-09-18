
import { describe, it, expect } from 'vitest';
import { ConwayLifeNode } from './conwaylife-node';
import { createTestContext } from '../test-utils';

describe('ConwayLifeNode', () => {
  it('should create ConwayLife', async () => {
    const context = createTestContext();
    const inputs = {
      initialCells: null
    };
    const params = {
      generations: 10,
      cellSize: 1
    };

    const result = await ConwayLifeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.liveCells).toBeDefined();
  });

  
});