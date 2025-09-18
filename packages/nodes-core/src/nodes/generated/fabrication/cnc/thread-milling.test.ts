
import { describe, it, expect } from 'vitest';
import { ThreadMillingNode } from './threadmilling-node';
import { createTestContext } from '../test-utils';

describe('ThreadMillingNode', () => {
  it('should create ThreadMilling', async () => {
    const context = createTestContext();
    const inputs = {
      holes: /* test value */
    };
    const params = {
      threadPitch: 1.5,
      threadDepth: 1,
      passes: 3
    };

    const result = await ThreadMillingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.threadPaths).toBeDefined();
  });

  
});