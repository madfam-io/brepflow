
import { describe, it, expect } from 'vitest';
import { StressReliefNode } from './stress-relief.node';
import { createTestContext } from '../test-utils';

describe('StressReliefNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shape: undefined
    } as any;
    const params = {
      analysisType: "geometric",
      reliefRadius: 2
    } as any;

    const result = await StressReliefNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
