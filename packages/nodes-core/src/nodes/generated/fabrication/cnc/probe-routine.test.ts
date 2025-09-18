
import { describe, it, expect } from 'vitest';
import { ProbeRoutineNode } from './proberoutine-node';
import { createTestContext } from '../test-utils';

describe('ProbeRoutineNode', () => {
  it('should create ProbeRoutine', async () => {
    const context = createTestContext();
    const inputs = {
      feature: null
    };
    const params = {
      probeType: "corner"
    };

    const result = await ProbeRoutineNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.probePoints).toBeDefined();
    expect(result.probeCycle).toBeDefined();
  });

  
});