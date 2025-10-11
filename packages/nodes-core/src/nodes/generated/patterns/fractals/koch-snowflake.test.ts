
import { describe, it, expect } from 'vitest';
import { KochSnowflakeNode } from './koch-snowflake.node';
import { createTestContext } from '../test-utils';

describe('KochSnowflakeNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      triangle: undefined
    } as any;
    const params = {
      iterations: 4
    } as any;

    const result = await KochSnowflakeNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
