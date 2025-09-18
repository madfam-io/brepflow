
import { describe, it, expect } from 'vitest';
import { SineFieldNode } from './sinefield-node';
import { createTestContext } from '../test-utils';

describe('SineFieldNode', () => {
  it('should create SineField', async () => {
    const context = createTestContext();
    const inputs = {
      domain: null
    };
    const params = {
      frequency: [0.1,0.1,0.1],
      amplitude: 1,
      phase: [0,0,0]
    };

    const result = await SineFieldNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.field).toBeDefined();
  });

  
});