
import { describe, it, expect } from 'vitest';
import { ContouringToolpathNode } from './contouringtoolpath.node';
import { createTestContext } from './../../test-utils';

describe('ContouringToolpathNode', () => {
  it('should create ContouringToolpath', async () => {
    const context = createTestContext();
    const inputs = {
      surface: null
    };
    const params = {
      levels: 10,
      climb: true,
      compensation: "right"
    };

    const result = await ContouringToolpathNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.contours).toBeDefined();
  });

  
});