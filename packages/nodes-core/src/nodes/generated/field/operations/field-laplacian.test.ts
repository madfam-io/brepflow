
import { describe, it, expect } from 'vitest';
import { FieldLaplacianNode } from './field-laplacian.node';
import { createTestContext } from '../test-utils';

describe('FieldLaplacianNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      field: undefined
    } as any;
    const params = {

    } as any;

    const result = await FieldLaplacianNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
