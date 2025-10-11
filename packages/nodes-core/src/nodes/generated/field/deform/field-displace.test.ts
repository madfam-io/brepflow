
import { describe, it, expect } from 'vitest';
import { FieldDisplaceNode } from './field-displace.node';
import { createTestContext } from '../test-utils';

describe('FieldDisplaceNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      surface: undefined,
      field: undefined
    } as any;
    const params = {
      strength: 10
    } as any;

    const result = await FieldDisplaceNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
