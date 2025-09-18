
import { describe, it, expect } from 'vitest';
import { ConfigurationNode } from './configuration-node';
import { createTestContext } from '../test-utils';

describe('ConfigurationNode', () => {
  it('should create Configuration', async () => {
    const context = createTestContext();
    const inputs = {
      assembly: /* test value */
    };
    const params = {
      name: "Default",
      suppressedComponents: ""
    };

    const result = await ConfigurationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.configuration).toBeDefined();
  });

  
});