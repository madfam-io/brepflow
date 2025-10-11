
import { describe, it, expect } from 'vitest';
import { ClampingCollarNode } from './clamping-collar.node';
import { createTestContext } from '../test-utils';

describe('ClampingCollarNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      position: undefined
    } as any;
    const params = {
      shaftDiameter: 10,
      outerDiameter: 20,
      width: 8,
      clampType: "set-screw"
    } as any;

    const result = await ClampingCollarNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
