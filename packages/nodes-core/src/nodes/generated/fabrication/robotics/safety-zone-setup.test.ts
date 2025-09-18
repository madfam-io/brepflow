
import { describe, it, expect } from 'vitest';
import { SafetyZoneSetupNode } from './safetyzonesetup-node';
import { createTestContext } from '../test-utils';

describe('SafetyZoneSetupNode', () => {
  it('should create SafetyZoneSetup', async () => {
    const context = createTestContext();
    const inputs = {
      zones: /* test value */
    };
    const params = {
      zoneType: "slow",
      responseTime: 0.5
    };

    const result = await SafetyZoneSetupNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.safetyConfiguration).toBeDefined();
  });

  
});