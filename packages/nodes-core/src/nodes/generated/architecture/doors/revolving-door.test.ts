
import { describe, it, expect } from 'vitest';
import { RevolvingDoorNode } from './revolvingdoor-node';
import { createTestContext } from '../test-utils';

describe('RevolvingDoorNode', () => {
  it('should create RevolvingDoor', async () => {
    const context = createTestContext();
    const inputs = {
      center: /* test value */
    };
    const params = {
      diameter: 2000,
      wings: 4,
      rotation: 0
    };

    const result = await RevolvingDoorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.revolvingDoor).toBeDefined();
  });

  
});