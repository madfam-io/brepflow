
import { describe, it, expect } from 'vitest';
import { FieldCurlAnalysisNode } from './field-curl-analysis.node';
import { createTestContext } from '../test-utils';

describe('FieldCurlAnalysisNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {

    } as any;

    const result = await FieldCurlAnalysisNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
