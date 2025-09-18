
import { describe, it, expect } from 'vitest';
import { PathNode } from './path-node';
import { createTestContext } from '../test-utils';

describe('PathNode', () => {
  it('should create Path', async () => {
    const context = createTestContext();
    const inputs = {
      path: null,
      follower: null
    };
    const params = {
      position: 0,
      tangent: true
    };

    const result = await PathNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.pathed).toBeDefined();
    expect(result.mate).toBeDefined();
  });

  
});