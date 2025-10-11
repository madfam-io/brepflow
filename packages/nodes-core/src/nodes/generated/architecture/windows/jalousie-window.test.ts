
import { describe, it, expect } from 'vitest';
import { JalousieWindowNode } from './jalousie-window.node';
import { createTestContext } from '../test-utils';

describe('JalousieWindowNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      opening: undefined
    } as any;
    const params = {
      slats: 10,
      angle: 0
    } as any;

    const result = await JalousieWindowNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
