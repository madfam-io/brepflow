
import { describe, it, expect } from 'vitest';
import { HexNutNode } from './hex-nut.node';
import { createTestContext } from '../test-utils';

describe('HexNutNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      position: undefined
    } as any;
    const params = {
      size: "M6",
      height: 5,
      style: "standard"
    } as any;

    const result = await HexNutNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
