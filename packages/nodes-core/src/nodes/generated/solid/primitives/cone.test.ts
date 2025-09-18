
import { describe, it, expect } from 'vitest';
import { ConeNode } from './cone-node';
import { createTestContext } from '../test-utils';

describe('ConeNode', () => {
  it('should create Cone', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      radius1: 50,
      radius2: 0,
      height: 100,
      centerX: 0,
      centerY: 0,
      centerZ: 0,
      angle: 360
    };

    const result = await ConeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.solid).toBeDefined();
  });

  
});