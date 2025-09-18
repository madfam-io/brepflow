
import { describe, it, expect } from 'vitest';
import { FieldCirculationNode } from './fieldcirculation-node';
import { createTestContext } from '../test-utils';

describe('FieldCirculationNode', () => {
  it('should create FieldCirculation', async () => {
    const context = createTestContext();
    const inputs = {
      curve: /* test value */
    };
    const params = {
      
    };

    const result = await FieldCirculationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.circulation).toBeDefined();
  });

  
});