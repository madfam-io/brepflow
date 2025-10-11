
import { describe, it, expect } from 'vitest';
import { ProjectCurveNode } from './project-curve.node';
import { createTestContext } from '../test-utils';

describe('ProjectCurveNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      curve: undefined,
      surface: undefined
    } as any;
    const params = {
      projectionDirection: [0,0,-1],
      projectBoth: false
    } as any;

    const result = await ProjectCurveNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
