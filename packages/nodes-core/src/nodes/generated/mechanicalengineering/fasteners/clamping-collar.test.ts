
import { describe, it, expect } from 'vitest';
import { ClampingCollarNode } from './clampingcollar-node';
import { createTestContext } from '../test-utils';

describe('ClampingCollarNode', () => {
  it('should create ClampingCollar', async () => {
    const context = createTestContext();
    const inputs = {
      position: /* test value */
    };
    const params = {
      shaftDiameter: 10,
      outerDiameter: 20,
      width: 8,
      clampType: "set-screw"
    };

    const result = await ClampingCollarNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.collar).toBeDefined();
    expect(result.bore).toBeDefined();
  });

  
});