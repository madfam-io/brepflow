
import { describe, it, expect } from 'vitest';
import { RectangularPocketNode } from './rectangular-pocket.node';
import { createTestContext } from '../test-utils';

describe('RectangularPocketNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      face: undefined,
      position: undefined
    } as any;
    const params = {
      width: 50,
      height: 30,
      depth: 10,
      cornerRadius: 0,
      draftAngle: 0
    } as any;

    const result = await RectangularPocketNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
