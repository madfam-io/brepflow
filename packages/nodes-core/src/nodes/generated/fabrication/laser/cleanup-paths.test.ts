
import { describe, it, expect } from 'vitest';
import { CleanupPathsNode } from './cleanup-paths.node';
import { createTestContext } from '../test-utils';

describe('CleanupPathsNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      paths: undefined
    } as any;
    const params = {
      tolerance: 0.01,
      removeDoubles: true
    } as any;

    const result = await CleanupPathsNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
