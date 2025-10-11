
import { describe, it, expect } from 'vitest';
import { GraphLayoutNode } from './graph-layout.node';
import { createTestContext } from '../test-utils';

describe('GraphLayoutNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      nodes: undefined,
      edges: undefined
    } as any;
    const params = {
      algorithm: "force-directed",
      iterations: 100
    } as any;

    const result = await GraphLayoutNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
