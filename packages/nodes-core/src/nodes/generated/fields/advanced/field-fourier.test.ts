
import { describe, it, expect } from 'vitest';
import { FieldFourierNode } from './field-fourier.node';
import { createTestContext } from '../test-utils';

describe('FieldFourierNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      direction: "\"forward\""
    } as any;

    const result = await FieldFourierNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
