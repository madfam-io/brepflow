
import { describe, it, expect } from 'vitest';
import { DutchDoorNode } from './dutchdoor-node';
import { createTestContext } from '../test-utils';

describe('DutchDoorNode', () => {
  it('should create DutchDoor', async () => {
    const context = createTestContext();
    const inputs = {
      opening: /* test value */
    };
    const params = {
      splitHeight: 1050,
      topOpen: false,
      bottomOpen: false
    };

    const result = await DutchDoorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.topDoor).toBeDefined();
    expect(result.bottomDoor).toBeDefined();
  });

  
});