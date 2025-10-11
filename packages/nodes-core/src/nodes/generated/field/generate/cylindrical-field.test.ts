
import { describe, it, expect } from 'vitest';
import { CylindricalFieldNode } from './cylindrical-field.node';
import { createTestContext } from '../test-utils';

describe('CylindricalFieldNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      axis: undefined
    } as any;
    const params = {
      radius: 50,
      height: 100,
      falloff: "smooth"
    } as any;

    const result = await CylindricalFieldNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
