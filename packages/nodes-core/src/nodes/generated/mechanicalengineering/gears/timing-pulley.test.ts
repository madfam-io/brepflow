
import { describe, it, expect } from 'vitest';
import { TimingPulleyNode } from './timingpulley.node';
import { createTestContext } from './../../test-utils';

describe('TimingPulleyNode', () => {
  it('should create TimingPulley', async () => {
    const context = createTestContext();
    const inputs = {
      center: null
    };
    const params = {
      pitch: "GT2",
      teeth: 20,
      width: 10,
      flanges: true
    };

    const result = await TimingPulleyNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.pulley).toBeDefined();
    expect(result.pitchCircle).toBeDefined();
  });

  
});