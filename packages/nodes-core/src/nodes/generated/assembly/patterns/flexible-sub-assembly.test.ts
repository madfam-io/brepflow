
import { describe, it, expect } from 'vitest';
import { FlexibleSubAssemblyNode } from './flexible-sub-assembly.node';
import { createTestContext } from '../test-utils';

describe('FlexibleSubAssemblyNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      components: undefined
    } as any;
    const params = {
      flexibility: "flexible"
    } as any;

    const result = await FlexibleSubAssemblyNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
