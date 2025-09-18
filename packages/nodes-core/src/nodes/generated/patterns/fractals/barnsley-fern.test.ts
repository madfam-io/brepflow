
import { describe, it, expect } from 'vitest';
import { BarnsleyFernNode } from './barnsleyfern-node';
import { createTestContext } from '../test-utils';

describe('BarnsleyFernNode', () => {
  it('should create BarnsleyFern', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      points: 10000,
      variation: "classic"
    };

    const result = await BarnsleyFernNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.fern).toBeDefined();
  });

  
});