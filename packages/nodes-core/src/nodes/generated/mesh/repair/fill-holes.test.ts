
import { describe, it, expect } from 'vitest';
import { FillHolesNode } from './fill-holes.node';
import { createTestContext } from '../test-utils';

describe('FillHolesNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      mesh: undefined
    } as any;
    const params = {
      maxHoleSize: 100,
      fillMethod: "smooth"
    } as any;

    const result = await FillHolesNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
