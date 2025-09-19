
import { describe, it, expect } from 'vitest';
import { ProximityAnalysisNode } from './proximityanalysis.node';
import { createTestContext } from './../../test-utils';

describe('ProximityAnalysisNode', () => {
  it('should create ProximityAnalysis', async () => {
    const context = createTestContext();
    const inputs = {
      objects: null
    };
    const params = {
      threshold: 1,
      showConnections: true
    };

    const result = await ProximityAnalysisNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.proximityPairs).toBeDefined();
    expect(result.distances).toBeDefined();
    expect(result.connections).toBeDefined();
  });

  
});