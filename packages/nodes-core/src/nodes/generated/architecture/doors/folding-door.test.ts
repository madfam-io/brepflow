
import { describe, it, expect } from 'vitest';
import { FoldingDoorNode } from './foldingdoor-node';
import { createTestContext } from '../test-utils';

describe('FoldingDoorNode', () => {
  it('should create FoldingDoor', async () => {
    const context = createTestContext();
    const inputs = {
      opening: /* test value */
    };
    const params = {
      panels: 4,
      foldDirection: "left"
    };

    const result = await FoldingDoorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.foldingDoor).toBeDefined();
  });

  
});