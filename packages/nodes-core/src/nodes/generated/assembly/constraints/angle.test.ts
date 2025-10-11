
import { describe, it, expect } from 'vitest';
import { AngleNode } from './angle.node';
import { createTestContext } from '../test-utils';

describe('AngleNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      entity1: undefined,
      entity2: undefined
    } as any;
    const params = {
      angle: 90
    } as any;

    const result = await AngleNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
