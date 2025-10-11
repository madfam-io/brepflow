
import { describe, it, expect } from 'vitest';
import { CoincidentNode } from './coincident.node';
import { createTestContext } from '../test-utils';

describe('CoincidentNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      entity1: undefined,
      entity2: undefined
    } as any;
    const params = {
      tolerance: 0.001
    } as any;

    const result = await CoincidentNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
