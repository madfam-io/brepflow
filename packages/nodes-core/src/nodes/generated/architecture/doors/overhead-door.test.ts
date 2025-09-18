
import { describe, it, expect } from 'vitest';
import { OverheadDoorNode } from './overheaddoor-node';
import { createTestContext } from '../test-utils';

describe('OverheadDoorNode', () => {
  it('should create OverheadDoor', async () => {
    const context = createTestContext();
    const inputs = {
      opening: /* test value */
    };
    const params = {
      sections: 4,
      trackType: "standard"
    };

    const result = await OverheadDoorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.overheadDoor).toBeDefined();
    expect(result.tracks).toBeDefined();
  });

  
});