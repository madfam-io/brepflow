
import { describe, it, expect } from 'vitest';
import { FieldCurlAnalysisNode } from './fieldcurlanalysis.node';
import { createTestContext } from './../../test-utils';

describe('FieldCurlAnalysisNode', () => {
  it('should create FieldCurlAnalysis', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      
    };

    const result = await FieldCurlAnalysisNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.curlField).toBeDefined();
  });

  
});