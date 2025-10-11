
import { describe, it, expect } from 'vitest';
import { Log10Node } from './log10.node';
import { createTestContext } from '../test-utils';

describe('Log10Node', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      value: undefined
    } as any;
    const params = {

    } as any;

    const result = await Log10Node.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
