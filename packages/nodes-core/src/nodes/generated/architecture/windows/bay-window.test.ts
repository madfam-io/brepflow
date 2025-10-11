
import { describe, it, expect } from 'vitest';
import { BayWindowNode } from './bay-window.node';
import { createTestContext } from '../test-utils';

describe('BayWindowNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      wallOpening: undefined
    } as any;
    const params = {
      projection: 600,
      angleCount: 3,
      centerAngle: 135
    } as any;

    const result = await BayWindowNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
