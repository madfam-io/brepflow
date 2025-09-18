
import { describe, it, expect } from 'vitest';
import { AlignNode } from './align-node';
import { createTestContext } from '../test-utils';

describe('AlignNode', () => {
  it('should create Align', async () => {
    const context = createTestContext();
    const inputs = {
      shapes: null
    };
    const params = {
      alignX: "center",
      alignY: "center",
      alignZ: "none"
    };

    const result = await AlignNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.aligned).toBeDefined();
  });

  
});