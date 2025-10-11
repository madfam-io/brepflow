
import { describe, it, expect } from 'vitest';
import { CellularAutomataNode } from './cellular-automata.node';
import { createTestContext } from '../test-utils';

describe('CellularAutomataNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      initialState: undefined
    } as any;
    const params = {
      rule: 30,
      generations: 50,
      cellSize: 1
    } as any;

    const result = await CellularAutomataNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
