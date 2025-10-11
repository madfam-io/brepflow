
import { describe, it, expect } from 'vitest';
import { FieldGridNode } from './field-grid.node';
import { createTestContext } from '../test-utils';

describe('FieldGridNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      field: undefined,
      bounds: undefined
    } as any;
    const params = {
      resolutionX: 10,
      resolutionY: 10,
      resolutionZ: 10
    } as any;

    const result = await FieldGridNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
