
import { describe, it, expect } from 'vitest';
import { PrintOrientationNode } from './print-orientation.node';
import { createTestContext } from '../test-utils';

describe('PrintOrientationNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      model: undefined
    } as any;
    const params = {
      optimize: "support",
      constraints: false
    } as any;

    const result = await PrintOrientationNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
