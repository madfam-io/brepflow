
import { describe, it, expect } from 'vitest';
import { DeleteFaceNode } from './delete-face.node';
import { createTestContext } from '../test-utils';

describe('DeleteFaceNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shape: undefined,
      facesToDelete: undefined
    } as any;
    const params = {
      healingType: "extend"
    } as any;

    const result = await DeleteFaceNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
