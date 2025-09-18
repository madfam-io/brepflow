
import { describe, it, expect } from 'vitest';
import { SupportVectorMachineNode } from './supportvectormachine-node';
import { createTestContext } from '../test-utils';

describe('SupportVectorMachineNode', () => {
  it('should create SupportVectorMachine', async () => {
    const context = createTestContext();
    const inputs = {
      trainingData: null,
      features: null,
      target: null
    };
    const params = {
      kernel: "rbf",
      c: 1,
      gamma: "scale"
    };

    const result = await SupportVectorMachineNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.model).toBeDefined();
    expect(result.supportVectors).toBeDefined();
    expect(result.accuracy).toBeDefined();
  });

  
});