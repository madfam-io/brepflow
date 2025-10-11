
import { describe, it, expect } from 'vitest';
import { TangentNode } from './tangent.node';
import { createTestContext } from '../test-utils';

describe('TangentNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      entity1: undefined,
      entity2: undefined
    } as any;
    const params = {
      inside: false
    } as any;

    const result = await TangentNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
