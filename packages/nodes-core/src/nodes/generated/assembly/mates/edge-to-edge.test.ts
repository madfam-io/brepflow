
import { describe, it, expect } from 'vitest';
import { EdgeToEdgeNode } from './edge-to-edge.node';
import { createTestContext } from '../test-utils';

describe('EdgeToEdgeNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      edge1: undefined,
      edge2: undefined
    } as any;
    const params = {
      alignment: "aligned"
    } as any;

    const result = await EdgeToEdgeNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
