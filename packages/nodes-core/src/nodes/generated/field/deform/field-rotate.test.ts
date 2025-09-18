
import { describe, it, expect } from 'vitest';
import { FieldRotateNode } from './fieldrotate-node';
import { createTestContext } from '../test-utils';

describe('FieldRotateNode', () => {
  it('should create FieldRotate', async () => {
    const context = createTestContext();
    const inputs = {
      geometry: /* test value */,
      field: /* test value */
    };
    const params = {
      maxAngle: 180
    };

    const result = await FieldRotateNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.rotated).toBeDefined();
  });

  
});