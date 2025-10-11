
import { describe, it, expect } from 'vitest';
import { QuasiCrystalNode } from './quasi-crystal.node';
import { createTestContext } from '../test-utils';

describe('QuasiCrystalNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      boundary: undefined
    } as any;
    const params = {
      symmetry: 5,
      waves: 4
    } as any;

    const result = await QuasiCrystalNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
