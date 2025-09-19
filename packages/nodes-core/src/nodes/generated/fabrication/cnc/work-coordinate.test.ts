
import { describe, it, expect } from 'vitest';
import { WorkCoordinateNode } from './workcoordinate.node';
import { createTestContext } from './../../test-utils';

describe('WorkCoordinateNode', () => {
  it('should create WorkCoordinate', async () => {
    const context = createTestContext();
    const inputs = {
      origin: null
    };
    const params = {
      wcs: "G54"
    };

    const result = await WorkCoordinateNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.coordinate).toBeDefined();
  });

  
});