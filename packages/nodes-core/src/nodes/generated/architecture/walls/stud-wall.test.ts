
import { describe, it, expect } from 'vitest';
import { StudWallNode } from './stud-wall.node';
import { createTestContext } from '../test-utils';

describe('StudWallNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      outline: undefined
    } as any;
    const params = {
      studSpacing: 400,
      studWidth: 90,
      studDepth: 45
    } as any;

    const result = await StudWallNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
