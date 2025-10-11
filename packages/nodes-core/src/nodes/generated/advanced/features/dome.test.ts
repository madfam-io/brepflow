
import { describe, it, expect } from 'vitest';
import { DomeNode } from './dome.node';
import { createTestContext } from '../test-utils';

describe('DomeNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      face: undefined
    } as any;
    const params = {
      height: 10,
      constraintType: "tangent"
    } as any;

    const result = await DomeNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
