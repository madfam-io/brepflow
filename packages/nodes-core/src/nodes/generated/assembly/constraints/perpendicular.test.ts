
import { describe, it, expect } from 'vitest';
import { PerpendicularNode } from './perpendicular.node';
import { createTestContext } from '../test-utils';

describe('PerpendicularNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      entity1: undefined,
      entity2: undefined
    } as any;
    const params = {

    } as any;

    const result = await PerpendicularNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
