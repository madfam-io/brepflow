
import { describe, it, expect } from 'vitest';
import { CurvatureCombNode } from './curvature-comb.node';
import { createTestContext } from '../test-utils';

describe('CurvatureCombNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      curve: undefined
    } as any;
    const params = {
      scale: 1,
      density: 50,
      showNormals: true,
      colorCode: false
    } as any;

    const result = await CurvatureCombNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
