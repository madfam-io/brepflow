
import { describe, it, expect } from 'vitest';
import { FieldMinMaxNode } from './field-min-max.node';
import { createTestContext } from '../test-utils';

describe('FieldMinMaxNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {

    } as any;

    const result = await FieldMinMaxNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
