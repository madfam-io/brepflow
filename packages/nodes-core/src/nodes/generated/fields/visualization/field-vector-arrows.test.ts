
import { describe, it, expect } from 'vitest';
import { FieldVectorArrowsNode } from './fieldvectorarrows-node';
import { createTestContext } from '../test-utils';

describe('FieldVectorArrowsNode', () => {
  it('should create FieldVectorArrows', async () => {
    const context = createTestContext();
    const inputs = {
      domain: null
    };
    const params = {
      arrowScale: 1,
      density: 0.5
    };

    const result = await FieldVectorArrowsNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.arrows).toBeDefined();
  });

  
});