
import { describe, it, expect } from 'vitest';
import { WaveFunctionCollapseNode } from './wavefunctioncollapse-node';
import { createTestContext } from '../test-utils';

describe('WaveFunctionCollapseNode', () => {
  it('should create WaveFunctionCollapse', async () => {
    const context = createTestContext();
    const inputs = {
      tileset: /* test value */
    };
    const params = {
      tilesetSize: 5,
      gridWidth: 20,
      gridHeight: 20
    };

    const result = await WaveFunctionCollapseNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.pattern).toBeDefined();
  });

  
});