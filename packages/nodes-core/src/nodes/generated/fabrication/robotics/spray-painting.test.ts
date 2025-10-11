
import { describe, it, expect } from 'vitest';
import { SprayPaintingNode } from './spray-painting.node';
import { createTestContext } from '../test-utils';

describe('SprayPaintingNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      surface: undefined
    } as any;
    const params = {
      sprayWidth: 100,
      overlap: 0.5,
      standoffDistance: 200
    } as any;

    const result = await SprayPaintingNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
