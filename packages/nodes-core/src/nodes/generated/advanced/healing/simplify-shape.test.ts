
import { describe, it, expect } from 'vitest';
import { SimplifyShapeNode } from './simplify-shape.node';
import { createTestContext } from '../test-utils';

describe('SimplifyShapeNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shape: undefined
    } as any;
    const params = {
      simplifyMethod: "merge-faces",
      tolerance: 0.01,
      preserveTopology: true
    } as any;

    const result = await SimplifyShapeNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
