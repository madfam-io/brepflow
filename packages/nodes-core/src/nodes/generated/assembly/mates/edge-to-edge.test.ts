
import { describe, it, expect } from 'vitest';
import { EdgeToEdgeNode } from './edgetoedge-node';
import { createTestContext } from '../test-utils';

describe('EdgeToEdgeNode', () => {
  it('should create EdgeToEdge', async () => {
    const context = createTestContext();
    const inputs = {
      edge1: /* test value */,
      edge2: /* test value */
    };
    const params = {
      alignment: "aligned"
    };

    const result = await EdgeToEdgeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.mated).toBeDefined();
    expect(result.mate).toBeDefined();
  });

  
});