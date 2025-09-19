
import { describe, it, expect } from 'vitest';
import { TextEngravingNode } from './textengraving.node';
import { createTestContext } from './../../test-utils';

describe('TextEngravingNode', () => {
  it('should create TextEngraving', async () => {
    const context = createTestContext();
    const inputs = {
      text: null,
      position: null
    };
    const params = {
      font: "single-line",
      height: 10
    };

    const result = await TextEngravingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.textPaths).toBeDefined();
  });

  
});