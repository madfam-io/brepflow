
import { describe, it, expect } from 'vitest';
import { CofferedCeilingNode } from './coffered-ceiling.node';
import { createTestContext } from '../test-utils';

describe('CofferedCeilingNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      ceilingBoundary: undefined
    } as any;
    const params = {
      cofferSize: 1200,
      cofferDepth: 150,
      beamWidth: 200
    } as any;

    const result = await CofferedCeilingNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
