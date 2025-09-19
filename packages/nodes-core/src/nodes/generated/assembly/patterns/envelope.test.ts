
import { describe, it, expect } from 'vitest';
import { EnvelopeNode } from './envelope.node';
import { createTestContext } from './../../test-utils';

describe('EnvelopeNode', () => {
  it('should create Envelope', async () => {
    const context = createTestContext();
    const inputs = {
      assembly: null
    };
    const params = {
      type: "bounding"
    };

    const result = await EnvelopeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.envelope).toBeDefined();
  });

  
});