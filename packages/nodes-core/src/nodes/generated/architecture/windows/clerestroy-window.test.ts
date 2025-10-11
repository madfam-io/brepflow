
import { describe, it, expect } from 'vitest';
import { ClerestroyWindowNode } from './clerestroy-window.node';
import { createTestContext } from '../test-utils';

describe('ClerestroyWindowNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      wallTop: undefined
    } as any;
    const params = {
      height: 600,
      continuous: true
    } as any;

    const result = await ClerestroyWindowNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
