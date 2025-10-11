
import { describe, it, expect } from 'vitest';
import { FieldFluxNode } from './field-flux.node';
import { createTestContext } from '../test-utils';

describe('FieldFluxNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      surface: undefined
    } as any;
    const params = {

    } as any;

    const result = await FieldFluxNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
