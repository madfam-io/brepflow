
import { describe, it, expect } from 'vitest';
import { ExtensionSpringNode } from './extension-spring.node';
import { createTestContext } from '../test-utils';

describe('ExtensionSpringNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      center: undefined
    } as any;
    const params = {
      wireDiameter: 1.5,
      coilDiameter: 15,
      bodyLength: 40,
      coils: 10,
      hookType: "machine"
    } as any;

    const result = await ExtensionSpringNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
