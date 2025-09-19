
import { describe, it, expect } from 'vitest';
import { SimplifyShapeNode } from './simplifyshape.node';
import { createTestContext } from './../../test-utils';

describe('SimplifyShapeNode', () => {
  it('should create SimplifyShape', async () => {
    const context = createTestContext();
    const inputs = {
      shape: null
    };
    const params = {
      simplifyMethod: "merge-faces",
      tolerance: 0.01,
      preserveTopology: true
    };

    const result = await SimplifyShapeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.simplified).toBeDefined();
  });

  
});