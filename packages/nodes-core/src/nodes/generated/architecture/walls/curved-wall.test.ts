
import { describe, it, expect } from 'vitest';
import { CurvedWallNode } from './curved-wall.node';
import { createTestContext } from '../test-utils';

describe('CurvedWallNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      curve: undefined
    } as any;
    const params = {
      height: 3000,
      thickness: 200,
      segments: 10
    } as any;

    const result = await CurvedWallNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
