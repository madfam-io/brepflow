
import { describe, it, expect } from 'vitest';
import { FieldCriticalPointsNode } from './fieldcriticalpoints-node';
import { createTestContext } from '../test-utils';

describe('FieldCriticalPointsNode', () => {
  it('should create FieldCriticalPoints', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      tolerance: 0.001,
      type: "\"all\""
    };

    const result = await FieldCriticalPointsNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.points).toBeDefined();
    expect(result.types).toBeDefined();
    expect(result.values).toBeDefined();
  });

  
});