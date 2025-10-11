
import { describe, it, expect } from 'vitest';
import { VerticalNode } from './vertical.node';
import { createTestContext } from '../test-utils';

describe('VerticalNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      entity: undefined
    } as any;
    const params = {

    } as any;

    const result = await VerticalNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
