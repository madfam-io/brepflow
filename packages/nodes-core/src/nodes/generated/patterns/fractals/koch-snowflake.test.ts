
import { describe, it, expect } from 'vitest';
import { KochSnowflakeNode } from './kochsnowflake.node';
import { createTestContext } from './../../test-utils';

describe('KochSnowflakeNode', () => {
  it('should create KochSnowflake', async () => {
    const context = createTestContext();
    const inputs = {
      triangle: null
    };
    const params = {
      iterations: 4
    };

    const result = await KochSnowflakeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.fractal).toBeDefined();
  });

  
});