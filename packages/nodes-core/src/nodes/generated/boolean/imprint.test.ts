
import { describe, it, expect } from 'vitest';
import { ImprintNode } from './imprint.node';
import { createTestContext } from '../test-utils';

describe('ImprintNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      base: undefined,
      imprint: undefined
    } as any;
    const params = {
      depth: 1
    } as any;

    const result = await ImprintNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
