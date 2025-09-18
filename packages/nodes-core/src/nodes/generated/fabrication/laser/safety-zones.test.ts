
import { describe, it, expect } from 'vitest';
import { SafetyZonesNode } from './safetyzones-node';
import { createTestContext } from '../test-utils';

describe('SafetyZonesNode', () => {
  it('should create SafetyZones', async () => {
    const context = createTestContext();
    const inputs = {
      workArea: null
    };
    const params = {
      margin: 5
    };

    const result = await SafetyZonesNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.safeArea).toBeDefined();
    expect(result.noGoZones).toBeDefined();
  });

  
});