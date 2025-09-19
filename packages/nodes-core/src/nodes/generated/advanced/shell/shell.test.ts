
import { describe, it, expect } from 'vitest';
import { ShellNode } from './shell.node';
import { createTestContext } from './../../test-utils';

describe('ShellNode', () => {
  it('should create Shell', async () => {
    const context = createTestContext();
    const inputs = {
      solid: null,
      facesToRemove: null
    };
    const params = {
      thickness: 2,
      direction: "inward",
      tolerance: 0.01
    };

    const result = await ShellNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shell).toBeDefined();
  });

  
});