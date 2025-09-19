
import { describe, it, expect } from 'vitest';
import { FlockingPatternNode } from './flockingpattern.node';
import { createTestContext } from './../../test-utils';

describe('FlockingPatternNode', () => {
  it('should create FlockingPattern', async () => {
    const context = createTestContext();
    const inputs = {
      boundary: null
    };
    const params = {
      agents: 50,
      steps: 100,
      cohesion: 1,
      separation: 1,
      alignment: 1
    };

    const result = await FlockingPatternNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.trails).toBeDefined();
  });

  
});