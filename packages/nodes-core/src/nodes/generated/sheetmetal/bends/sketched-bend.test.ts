
import { describe, it, expect } from 'vitest';
import { SketchedBendNode } from './sketched-bend.node';
import { createTestContext } from '../test-utils';

describe('SketchedBendNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      sheet: undefined,
      bendLine: undefined
    } as any;
    const params = {
      angle: 90,
      bendRadius: 3,
      bendDirection: "up",
      bendAllowance: 0
    } as any;

    const result = await SketchedBendNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
