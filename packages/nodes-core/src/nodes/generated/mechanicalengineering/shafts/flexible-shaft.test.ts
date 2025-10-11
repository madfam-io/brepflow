
import { describe, it, expect } from 'vitest';
import { FlexibleShaftNode } from './flexible-shaft.node';
import { createTestContext } from '../test-utils';

describe('FlexibleShaftNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      path: undefined
    } as any;
    const params = {
      coreDiameter: 5,
      outerDiameter: 8,
      length: 300,
      windingAngle: 45
    } as any;

    const result = await FlexibleShaftNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
