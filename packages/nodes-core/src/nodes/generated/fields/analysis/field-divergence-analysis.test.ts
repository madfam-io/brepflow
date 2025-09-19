
import { describe, it, expect } from 'vitest';
import { FieldDivergenceAnalysisNode } from './fielddivergenceanalysis.node';
import { createTestContext } from './../../test-utils';

describe('FieldDivergenceAnalysisNode', () => {
  it('should create FieldDivergenceAnalysis', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      
    };

    const result = await FieldDivergenceAnalysisNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.divergenceField).toBeDefined();
  });

  
});