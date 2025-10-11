
import { describe, it, expect } from 'vitest';
import { FieldVectorArrowsNode } from './field-vector-arrows.node';
import { createTestContext } from '../test-utils';

describe('FieldVectorArrowsNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      domain: undefined
    } as any;
    const params = {
      arrowScale: 1,
      density: 0.5
    } as any;

    const result = await FieldVectorArrowsNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
