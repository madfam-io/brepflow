
import { describe, it, expect } from 'vitest';
import { WaveFunctionCollapseNode } from './wave-function-collapse.node';
import { createTestContext } from '../test-utils';

describe('WaveFunctionCollapseNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      tileset: undefined
    } as any;
    const params = {
      tilesetSize: 5,
      gridWidth: 20,
      gridHeight: 20
    } as any;

    const result = await WaveFunctionCollapseNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
