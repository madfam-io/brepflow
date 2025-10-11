
import { describe, it, expect } from 'vitest';
import { FieldCirculationNode } from './field-circulation.node';
import { createTestContext } from '../test-utils';

describe('FieldCirculationNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      curve: undefined
    } as any;
    const params = {

    } as any;

    const result = await FieldCirculationNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
