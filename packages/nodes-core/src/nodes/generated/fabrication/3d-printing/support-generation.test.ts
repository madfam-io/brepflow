
import { describe, it, expect } from 'vitest';
import { SupportGenerationNode } from './supportgeneration-node';
import { createTestContext } from '../test-utils';

describe('SupportGenerationNode', () => {
  it('should create SupportGeneration', async () => {
    const context = createTestContext();
    const inputs = {
      model: /* test value */
    };
    const params = {
      type: "tree",
      angle: 45,
      density: 0.2
    };

    const result = await SupportGenerationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.supports).toBeDefined();
    expect(result.supportedModel).toBeDefined();
  });

  
});