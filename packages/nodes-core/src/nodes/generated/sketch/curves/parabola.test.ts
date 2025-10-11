
import { describe, it, expect } from 'vitest';
import { ParabolaNode } from './parabola.node';
import { createTestContext } from '../test-utils';

describe('ParabolaNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      focalLength: 10,
      startParam: -100,
      endParam: 100
    } as any;

    const result = await ParabolaNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
