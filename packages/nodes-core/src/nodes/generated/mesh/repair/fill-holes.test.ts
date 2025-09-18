
import { describe, it, expect } from 'vitest';
import { FillHolesNode } from './fillholes-node';
import { createTestContext } from '../test-utils';

describe('FillHolesNode', () => {
  it('should create FillHoles', async () => {
    const context = createTestContext();
    const inputs = {
      mesh: /* test value */
    };
    const params = {
      maxHoleSize: 100,
      fillMethod: "smooth"
    };

    const result = await FillHolesNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.filled).toBeDefined();
    expect(result.holesCount).toBeDefined();
  });

  
});