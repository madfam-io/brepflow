
import { describe, it, expect } from 'vitest';
import { SkyLightNode } from './skylight-node';
import { createTestContext } from '../test-utils';

describe('SkyLightNode', () => {
  it('should create SkyLight', async () => {
    const context = createTestContext();
    const inputs = {
      opening: /* test value */
    };
    const params = {
      type: "pyramid",
      glazingType: "double"
    };

    const result = await SkyLightNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.skylight).toBeDefined();
    expect(result.frame).toBeDefined();
  });

  
});