
import { describe, it, expect } from 'vitest';
import { LouverNode } from './louver.node';
import { createTestContext } from '../test-utils';

describe('LouverNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      sheet: undefined,
      position: undefined,
      direction: undefined
    } as any;
    const params = {
      louverLength: 30,
      louverWidth: 5,
      louverHeight: 5,
      louverAngle: 45
    } as any;

    const result = await LouverNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
