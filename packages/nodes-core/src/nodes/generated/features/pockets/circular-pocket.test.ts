
import { describe, it, expect } from 'vitest';
import { CircularPocketNode } from './circular-pocket.node';
import { createTestContext } from '../test-utils';

describe('CircularPocketNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      face: undefined,
      position: undefined
    } as any;
    const params = {
      diameter: 40,
      depth: 10,
      draftAngle: 0
    } as any;

    const result = await CircularPocketNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
