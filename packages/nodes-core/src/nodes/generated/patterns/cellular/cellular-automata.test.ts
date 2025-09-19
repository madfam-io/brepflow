
import { describe, it, expect } from 'vitest';
import { CellularAutomataNode } from './cellularautomata.node';
import { createTestContext } from './../../test-utils';

describe('CellularAutomataNode', () => {
  it('should create CellularAutomata', async () => {
    const context = createTestContext();
    const inputs = {
      initialState: null
    };
    const params = {
      rule: 30,
      generations: 50,
      cellSize: 1
    };

    const result = await CellularAutomataNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.cells).toBeDefined();
  });

  
});