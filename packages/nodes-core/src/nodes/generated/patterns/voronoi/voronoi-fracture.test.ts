
import { describe, it, expect } from 'vitest';
import { VoronoiFractureNode } from './voronoi-fracture.node';
import { createTestContext } from '../test-utils';

describe('VoronoiFractureNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      surface: undefined
    } as any;
    const params = {
      irregularity: 0.5,
      density: 10
    } as any;

    const result = await VoronoiFractureNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
