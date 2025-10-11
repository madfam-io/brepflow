
import { describe, it, expect } from 'vitest';
import { SectionCurvesNode } from './section-curves.node';
import { createTestContext } from '../test-utils';

describe('SectionCurvesNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shape: undefined
    } as any;
    const params = {
      planeNormal: [0,0,1],
      spacing: 10,
      count: 10
    } as any;

    const result = await SectionCurvesNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
