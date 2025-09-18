
import { describe, it, expect } from 'vitest';
import { CeilingBeamNode } from './ceilingbeam-node';
import { createTestContext } from '../test-utils';

describe('CeilingBeamNode', () => {
  it('should create CeilingBeam', async () => {
    const context = createTestContext();
    const inputs = {
      ceilingArea: null
    };
    const params = {
      beamDepth: 300,
      beamWidth: 150,
      spacing: 1200
    };

    const result = await CeilingBeamNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.beams).toBeDefined();
  });

  
});