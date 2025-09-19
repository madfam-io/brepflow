
import { describe, it, expect } from 'vitest';
import { RackPinionNode } from './rackpinion.node';
import { createTestContext } from './../../test-utils';

describe('RackPinionNode', () => {
  it('should create RackPinion', async () => {
    const context = createTestContext();
    const inputs = {
      rack: null,
      pinion: null
    };
    const params = {
      module: 1
    };

    const result = await RackPinionNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.joint).toBeDefined();
  });

  
});