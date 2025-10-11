
import { describe, it, expect } from 'vitest';
import { DistanceFieldNode } from './distance-field.node';
import { createTestContext } from '../test-utils';

describe('DistanceFieldNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      geometry: undefined
    } as any;
    const params = {
      maxDistance: 100,
      inside: false,
      signed: true
    } as any;

    const result = await DistanceFieldNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
