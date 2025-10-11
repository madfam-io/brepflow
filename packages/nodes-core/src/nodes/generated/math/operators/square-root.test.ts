
import { describe, it, expect } from 'vitest';
import { SquareRootNode } from './square-root.node';
import { createTestContext } from '../test-utils';

describe('SquareRootNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      value: undefined
    } as any;
    const params = {

    } as any;

    const result = await SquareRootNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
