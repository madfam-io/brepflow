
import { describe, it, expect } from 'vitest';
import { SkyLightNode } from './sky-light.node';
import { createTestContext } from '../test-utils';

describe('SkyLightNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      opening: undefined
    } as any;
    const params = {
      type: "pyramid",
      glazingType: "double"
    } as any;

    const result = await SkyLightNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
