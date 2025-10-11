
import { describe, it, expect } from 'vitest';
import { HorizontalNode } from './horizontal.node';
import { createTestContext } from '../test-utils';

describe('HorizontalNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      entity: undefined
    } as any;
    const params = {

    } as any;

    const result = await HorizontalNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
