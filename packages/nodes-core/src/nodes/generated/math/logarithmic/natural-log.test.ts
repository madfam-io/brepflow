
import { describe, it, expect } from 'vitest';
import { NaturalLogNode } from './natural-log.node';
import { createTestContext } from '../test-utils';

describe('NaturalLogNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      value: undefined
    } as any;
    const params = {

    } as any;

    const result = await NaturalLogNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
