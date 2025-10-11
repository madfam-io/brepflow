
import { describe, it, expect } from 'vitest';
import { BarnsleyFernNode } from './barnsley-fern.node';
import { createTestContext } from '../test-utils';

describe('BarnsleyFernNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      points: 10000,
      variation: "classic"
    } as any;

    const result = await BarnsleyFernNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
