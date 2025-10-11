
import { describe, it, expect } from 'vitest';
import { AwningWindowNode } from './awning-window.node';
import { createTestContext } from '../test-utils';

describe('AwningWindowNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      opening: undefined
    } as any;
    const params = {
      opening: 0
    } as any;

    const result = await AwningWindowNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
