
import { describe, it, expect } from 'vitest';
import { ConfigurationNode } from './configuration.node';
import { createTestContext } from '../test-utils';

describe('ConfigurationNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      assembly: undefined
    } as any;
    const params = {
      name: "Default",
      suppressedComponents: ""
    } as any;

    const result = await ConfigurationNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
