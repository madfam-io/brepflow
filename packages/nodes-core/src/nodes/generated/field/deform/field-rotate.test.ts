
import { describe, it, expect } from 'vitest';
import { FieldRotateNode } from './fieldrotate-node';
import { createTestContext } from '../test-utils';

describe('FieldRotateNode', () => {
  it('should create FieldRotate', async () => {
    const context = createTestContext();
    const inputs = {
      geometry: null,
      field: null
    };
    const params = {
      maxAngle: 180
    };

    const result = await FieldRotateNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.rotated).toBeDefined();
  });

  
});