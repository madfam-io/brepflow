
import { describe, it, expect } from 'vitest';
import { RaftGenerationNode } from './raftgeneration.node';
import { createTestContext } from './../../test-utils';

describe('RaftGenerationNode', () => {
  it('should create RaftGeneration', async () => {
    const context = createTestContext();
    const inputs = {
      model: null
    };
    const params = {
      raftLayers: 3,
      raftOffset: 5
    };

    const result = await RaftGenerationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.raft).toBeDefined();
  });

  
});