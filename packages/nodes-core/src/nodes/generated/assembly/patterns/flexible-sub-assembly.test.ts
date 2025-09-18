
import { describe, it, expect } from 'vitest';
import { FlexibleSubAssemblyNode } from './flexiblesubassembly-node';
import { createTestContext } from '../test-utils';

describe('FlexibleSubAssemblyNode', () => {
  it('should create FlexibleSubAssembly', async () => {
    const context = createTestContext();
    const inputs = {
      components: null
    };
    const params = {
      flexibility: "flexible"
    };

    const result = await FlexibleSubAssemblyNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.subAssembly).toBeDefined();
  });

  
});