
import { describe, it, expect } from 'vitest';
import { InletOutletNode } from './inletoutlet.node';
import { createTestContext } from './../../test-utils';

describe('InletOutletNode', () => {
  it('should create InletOutlet', async () => {
    const context = createTestContext();
    const inputs = {
      mesh: null,
      boundaryFaces: null
    };
    const params = {
      boundaryType: "velocity-inlet",
      velocity: 1,
      pressure: 101325,
      temperature: 293
    };

    const result = await InletOutletNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.boundaryMesh).toBeDefined();
    expect(result.boundaryData).toBeDefined();
  });

  
});