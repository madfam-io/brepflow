
import { describe, it, expect } from 'vitest';
import { RectangularPocketNode } from './rectangularpocket-node';
import { createTestContext } from '../test-utils';

describe('RectangularPocketNode', () => {
  it('should create RectangularPocket', async () => {
    const context = createTestContext();
    const inputs = {
      face: /* test value */,
      position: /* test value */
    };
    const params = {
      width: 50,
      height: 30,
      depth: 10,
      cornerRadius: 0,
      draftAngle: 0
    };

    const result = await RectangularPocketNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shape).toBeDefined();
  });

  
});