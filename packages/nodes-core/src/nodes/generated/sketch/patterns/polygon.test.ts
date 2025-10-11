
import { describe, it, expect } from 'vitest';
import { PolygonNode } from './polygon.node';
import { createTestContext } from '../test-utils';

describe('PolygonNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      sides: 6,
      radius: 50,
      inscribed: true
    } as any;

    const result = await PolygonNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
