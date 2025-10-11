
import { describe, it, expect } from 'vitest';
import { FoldingDoorNode } from './folding-door.node';
import { createTestContext } from '../test-utils';

describe('FoldingDoorNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      opening: undefined
    } as any;
    const params = {
      panels: 4,
      foldDirection: "left"
    } as any;

    const result = await FoldingDoorNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
