
import { describe, it, expect } from 'vitest';
import { PolygonNode } from './polygon-node';
import { createTestContext } from '../test-utils';

describe('PolygonNode', () => {
  it('should create Polygon', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      sides: 6,
      radius: 50,
      inscribed: true
    };

    const result = await PolygonNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.polygon).toBeDefined();
  });

  
});