
import { describe, it, expect } from 'vitest';
import { FieldMorphingNode } from './field-morphing.node';
import { createTestContext } from '../test-utils';

describe('FieldMorphingNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      factor: 0.5,
      interpolation: "\"linear\""
    } as any;

    const result = await FieldMorphingNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
