
import { describe, it, expect } from 'vitest';
import { RaftGenerationNode } from './raft-generation.node';
import { createTestContext } from '../test-utils';

describe('RaftGenerationNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      model: undefined
    } as any;
    const params = {
      raftLayers: 3,
      raftOffset: 5
    } as any;

    const result = await RaftGenerationNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
