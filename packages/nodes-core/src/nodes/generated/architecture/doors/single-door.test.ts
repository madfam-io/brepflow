
import { describe, it, expect } from 'vitest';
import { SingleDoorNode } from './singledoor.node';
import { createTestContext } from './../../test-utils';

describe('SingleDoorNode', () => {
  it('should create SingleDoor', async () => {
    const context = createTestContext();
    const inputs = {
      position: null
    };
    const params = {
      width: 900,
      height: 2100,
      thickness: 45,
      swing: "right",
      opening: 0
    };

    const result = await SingleDoorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.door).toBeDefined();
    expect(result.frame).toBeDefined();
  });

  
});