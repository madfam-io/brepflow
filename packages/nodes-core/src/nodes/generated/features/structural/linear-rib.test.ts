
import { describe, it, expect } from 'vitest';
import { LinearRibNode } from './linear-rib.node';
import { createTestContext } from '../test-utils';

describe('LinearRibNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      face: undefined,
      path: undefined
    } as any;
    const params = {
      thickness: 3,
      height: 20,
      draftAngle: 1,
      topRadius: 1
    } as any;

    const result = await LinearRibNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
