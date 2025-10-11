
import { describe, it, expect } from 'vitest';
import { CompressionSpringNode } from './compression-spring.node';
import { createTestContext } from '../test-utils';

describe('CompressionSpringNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      center: undefined
    } as any;
    const params = {
      wireDiameter: 2,
      coilDiameter: 20,
      freeLength: 50,
      coils: 8,
      endType: "closed"
    } as any;

    const result = await CompressionSpringNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
