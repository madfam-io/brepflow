
import { describe, it, expect } from 'vitest';
import { AdaptiveClearingNode } from './adaptiveclearing.node';
import { createTestContext } from './../../test-utils';

describe('AdaptiveClearingNode', () => {
  it('should create AdaptiveClearing', async () => {
    const context = createTestContext();
    const inputs = {
      region: null,
      depth: null
    };
    const params = {
      optimalLoad: 0.4,
      helixAngle: 3
    };

    const result = await AdaptiveClearingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.adaptivePath).toBeDefined();
  });

  
});