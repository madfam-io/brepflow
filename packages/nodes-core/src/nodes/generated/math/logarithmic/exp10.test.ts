
import { describe, it, expect } from 'vitest';
import { Exp10Node } from './exp10.node';
import { createTestContext } from '../test-utils';

describe('Exp10Node', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      value: undefined
    } as any;
    const params = {

    } as any;

    const result = await Exp10Node.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
