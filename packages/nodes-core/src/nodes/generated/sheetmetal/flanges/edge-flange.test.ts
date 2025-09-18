
import { describe, it, expect } from 'vitest';
import { EdgeFlangeNode } from './edgeflange-node';
import { createTestContext } from '../test-utils';

describe('EdgeFlangeNode', () => {
  it('should create EdgeFlange', async () => {
    const context = createTestContext();
    const inputs = {
      sheet: /* test value */,
      edge: /* test value */
    };
    const params = {
      height: 25,
      angle: 90,
      bendRadius: 3,
      bendRelief: "rectangular",
      reliefRatio: 0.5
    };

    const result = await EdgeFlangeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});