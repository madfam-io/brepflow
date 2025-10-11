
import { describe, it, expect } from 'vitest';
import { ConcentricNode } from './concentric.node';
import { createTestContext } from '../test-utils';

describe('ConcentricNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      entity1: undefined,
      entity2: undefined
    } as any;
    const params = {

    } as any;

    const result = await ConcentricNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
