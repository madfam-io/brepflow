
import { describe, it, expect } from 'vitest';
import { AngleBetweenLinesNode } from './anglebetweenlines-node';
import { createTestContext } from '../test-utils';

describe('AngleBetweenLinesNode', () => {
  it('should create AngleBetweenLines', async () => {
    const context = createTestContext();
    const inputs = {
      line1: /* test value */,
      line2: /* test value */
    };
    const params = {
      unit: "degrees"
    };

    const result = await AngleBetweenLinesNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.angle).toBeDefined();
  });

  
});