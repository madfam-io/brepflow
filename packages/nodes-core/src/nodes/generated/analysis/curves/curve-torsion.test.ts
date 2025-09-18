
import { describe, it, expect } from 'vitest';
import { CurveTorsionNode } from './curvetorsion-node';
import { createTestContext } from '../test-utils';

describe('CurveTorsionNode', () => {
  it('should create CurveTorsion', async () => {
    const context = createTestContext();
    const inputs = {
      curve: /* test value */
    };
    const params = {
      samples: 100,
      scale: 1,
      showGraph: true
    };

    const result = await CurveTorsionNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.torsionValues).toBeDefined();
    expect(result.maxTorsion).toBeDefined();
    expect(result.torsionGraph).toBeDefined();
  });

  
});