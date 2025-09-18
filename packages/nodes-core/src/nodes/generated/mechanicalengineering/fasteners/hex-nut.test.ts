
import { describe, it, expect } from 'vitest';
import { HexNutNode } from './hexnut-node';
import { createTestContext } from '../test-utils';

describe('HexNutNode', () => {
  it('should create HexNut', async () => {
    const context = createTestContext();
    const inputs = {
      position: /* test value */
    };
    const params = {
      size: "M6",
      height: 5,
      style: "standard"
    };

    const result = await HexNutNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.nut).toBeDefined();
    expect(result.thread).toBeDefined();
  });

  
});