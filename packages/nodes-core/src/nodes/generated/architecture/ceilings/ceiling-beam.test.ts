
import { describe, it, expect } from 'vitest';
import { CeilingBeamNode } from './ceiling-beam.node';
import { createTestContext } from '../test-utils';

describe('CeilingBeamNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      ceilingArea: undefined
    } as any;
    const params = {
      beamDepth: 300,
      beamWidth: 150,
      spacing: 1200
    } as any;

    const result = await CeilingBeamNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
