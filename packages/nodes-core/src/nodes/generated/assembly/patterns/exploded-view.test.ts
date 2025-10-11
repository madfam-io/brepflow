
import { describe, it, expect } from 'vitest';
import { ExplodedViewNode } from './exploded-view.node';
import { createTestContext } from '../test-utils';

describe('ExplodedViewNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      assembly: undefined
    } as any;
    const params = {
      distance: 100,
      autoSpace: true
    } as any;

    const result = await ExplodedViewNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
