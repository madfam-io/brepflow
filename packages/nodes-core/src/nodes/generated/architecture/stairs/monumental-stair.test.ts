
import { describe, it, expect } from 'vitest';
import { MonumentalStairNode } from './monumental-stair.node';
import { createTestContext } from '../test-utils';

describe('MonumentalStairNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      footprint: undefined
    } as any;
    const params = {
      style: "imperial",
      width: 3000
    } as any;

    const result = await MonumentalStairNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
