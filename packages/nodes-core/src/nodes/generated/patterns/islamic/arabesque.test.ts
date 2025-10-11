
import { describe, it, expect } from 'vitest';
import { ArabesqueNode } from './arabesque.node';
import { createTestContext } from '../test-utils';

describe('ArabesqueNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      boundary: undefined
    } as any;
    const params = {
      complexity: 3,
      symmetry: 6
    } as any;

    const result = await ArabesqueNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
