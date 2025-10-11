
import { describe, it, expect } from 'vitest';
import { MultiplePassesNode } from './multiple-passes.node';
import { createTestContext } from '../test-utils';

describe('MultiplePassesNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      paths: undefined
    } as any;
    const params = {
      passes: 2,
      powerRamp: false,
      zStep: 0
    } as any;

    const result = await MultiplePassesNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
