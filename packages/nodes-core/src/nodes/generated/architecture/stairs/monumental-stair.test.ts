
import { describe, it, expect } from 'vitest';
import { MonumentalStairNode } from './monumentalstair-node';
import { createTestContext } from '../test-utils';

describe('MonumentalStairNode', () => {
  it('should create MonumentalStair', async () => {
    const context = createTestContext();
    const inputs = {
      footprint: null
    };
    const params = {
      style: "imperial",
      width: 3000
    };

    const result = await MonumentalStairNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.monumentalStair).toBeDefined();
  });

  
});