
import { describe, it, expect } from 'vitest';
import { PowerNode } from './power.node';
import { createTestContext } from '../test-utils';

describe('PowerNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      base: undefined,
      exponent: undefined
    } as any;
    const params = {

    } as any;

    const result = await PowerNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
