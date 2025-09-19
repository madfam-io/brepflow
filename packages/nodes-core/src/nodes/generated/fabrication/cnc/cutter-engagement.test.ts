
import { describe, it, expect } from 'vitest';
import { CutterEngagementNode } from './cutterengagement.node';
import { createTestContext } from './../../test-utils';

describe('CutterEngagementNode', () => {
  it('should create CutterEngagement', async () => {
    const context = createTestContext();
    const inputs = {
      toolpath: null,
      stock: null
    };
    const params = {
      toolDiameter: 10
    };

    const result = await CutterEngagementNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.engagementAngle).toBeDefined();
  });

  
});