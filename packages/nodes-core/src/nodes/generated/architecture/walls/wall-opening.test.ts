
import { describe, it, expect } from 'vitest';
import { WallOpeningNode } from './wallopening-node';
import { createTestContext } from '../test-utils';

describe('WallOpeningNode', () => {
  it('should create WallOpening', async () => {
    const context = createTestContext();
    const inputs = {
      wall: null,
      position: null
    };
    const params = {
      width: 900,
      height: 2100,
      sillHeight: 0
    };

    const result = await WallOpeningNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.wallWithOpening).toBeDefined();
    expect(result.opening).toBeDefined();
  });

  
});