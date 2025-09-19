
import { describe, it, expect } from 'vitest';
import { ExtensionSpringNode } from './extensionspring.node';
import { createTestContext } from './../../test-utils';

describe('ExtensionSpringNode', () => {
  it('should create ExtensionSpring', async () => {
    const context = createTestContext();
    const inputs = {
      center: null
    };
    const params = {
      wireDiameter: 1.5,
      coilDiameter: 15,
      bodyLength: 40,
      coils: 10,
      hookType: "machine"
    };

    const result = await ExtensionSpringNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.spring).toBeDefined();
    expect(result.hooks).toBeDefined();
  });

  
});