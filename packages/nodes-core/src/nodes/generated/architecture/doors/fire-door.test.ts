
import { describe, it, expect } from 'vitest';
import { FireDoorNode } from './firedoor-node';
import { createTestContext } from '../test-utils';

describe('FireDoorNode', () => {
  it('should create FireDoor', async () => {
    const context = createTestContext();
    const inputs = {
      opening: /* test value */
    };
    const params = {
      rating: "60-min",
      closer: true,
      panic: true
    };

    const result = await FireDoorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.fireDoor).toBeDefined();
  });

  
});