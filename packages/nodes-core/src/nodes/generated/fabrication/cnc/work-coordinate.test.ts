
import { describe, it, expect } from 'vitest';
import { WorkCoordinateNode } from './work-coordinate.node';
import { createTestContext } from '../test-utils';

describe('WorkCoordinateNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      origin: undefined
    } as any;
    const params = {
      wcs: "G54"
    } as any;

    const result = await WorkCoordinateNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
