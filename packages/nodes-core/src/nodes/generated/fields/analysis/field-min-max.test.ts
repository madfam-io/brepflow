
import { describe, it, expect } from 'vitest';
import { FieldMinMaxNode } from './fieldminmax-node';
import { createTestContext } from '../test-utils';

describe('FieldMinMaxNode', () => {
  it('should create FieldMinMax', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      
    };

    const result = await FieldMinMaxNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.min).toBeDefined();
    expect(result.max).toBeDefined();
    expect(result.minPoint).toBeDefined();
    expect(result.maxPoint).toBeDefined();
  });

  
});