
import { describe, it, expect } from 'vitest';
import { SupportVectorMachineNode } from './support-vector-machine.node';
import { createTestContext } from '../test-utils';

describe('SupportVectorMachineNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      trainingData: undefined,
      features: undefined,
      target: undefined
    } as any;
    const params = {
      kernel: "rbf",
      c: 1,
      gamma: "scale"
    } as any;

    const result = await SupportVectorMachineNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
