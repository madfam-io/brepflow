
import { describe, it, expect } from 'vitest';
import { SectionCurvesNode } from './sectioncurves-node';
import { createTestContext } from '../test-utils';

describe('SectionCurvesNode', () => {
  it('should create SectionCurves', async () => {
    const context = createTestContext();
    const inputs = {
      shape: null
    };
    const params = {
      planeNormal: [0,0,1],
      spacing: 10,
      count: 10
    };

    const result = await SectionCurvesNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.sections).toBeDefined();
  });

  
});