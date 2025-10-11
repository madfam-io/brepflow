
import { describe, it, expect } from 'vitest';
import { SupportGenerationNode } from './support-generation.node';
import { createTestContext } from '../test-utils';

describe('SupportGenerationNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      model: undefined
    } as any;
    const params = {
      type: "tree",
      angle: 45,
      density: 0.2
    } as any;

    const result = await SupportGenerationNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
