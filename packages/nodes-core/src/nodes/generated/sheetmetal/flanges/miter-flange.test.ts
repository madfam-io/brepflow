
import { describe, it, expect } from 'vitest';
import { MiterFlangeNode } from './miterflange-node';
import { createTestContext } from '../test-utils';

describe('MiterFlangeNode', () => {
  it('should create MiterFlange', async () => {
    const context = createTestContext();
    const inputs = {
      sheet: null,
      edges: null
    };
    const params = {
      height: 25,
      angle: 90,
      miterAngle: 45,
      bendRadius: 3
    };

    const result = await MiterFlangeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});