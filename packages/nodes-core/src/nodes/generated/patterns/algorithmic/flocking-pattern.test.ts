
import { describe, it, expect } from 'vitest';
import { FlockingPatternNode } from './flocking-pattern.node';
import { createTestContext } from '../test-utils';

describe('FlockingPatternNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      boundary: undefined
    } as any;
    const params = {
      agents: 50,
      steps: 100,
      cohesion: 1,
      separation: 1,
      alignment: 1
    } as any;

    const result = await FlockingPatternNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
