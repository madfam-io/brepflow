
import { describe, it, expect } from 'vitest';
import { MiterFlangeNode } from './miter-flange.node';
import { createTestContext } from '../test-utils';

describe('MiterFlangeNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      sheet: undefined,
      edges: undefined
    } as any;
    const params = {
      height: 25,
      angle: 90,
      miterAngle: 45,
      bendRadius: 3
    } as any;

    const result = await MiterFlangeNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
