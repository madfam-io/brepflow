
import { describe, it, expect } from 'vitest';
import { CheckGeometryNode } from './check-geometry.node';
import { createTestContext } from '../test-utils';

describe('CheckGeometryNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shape: undefined
    } as any;
    const params = {
      checkLevel: "standard"
    } as any;

    const result = await CheckGeometryNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
