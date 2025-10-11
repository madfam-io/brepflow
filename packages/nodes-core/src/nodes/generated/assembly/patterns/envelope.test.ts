
import { describe, it, expect } from 'vitest';
import { EnvelopeNode } from './envelope.node';
import { createTestContext } from '../test-utils';

describe('EnvelopeNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      assembly: undefined
    } as any;
    const params = {
      type: "bounding"
    } as any;

    const result = await EnvelopeNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
