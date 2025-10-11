
import { describe, it, expect } from 'vitest';
import { SafetyZonesNode } from './safety-zones.node';
import { createTestContext } from '../test-utils';

describe('SafetyZonesNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      workArea: undefined
    } as any;
    const params = {
      margin: 5
    } as any;

    const result = await SafetyZonesNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
