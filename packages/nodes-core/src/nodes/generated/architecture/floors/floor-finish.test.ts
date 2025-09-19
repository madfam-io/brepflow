
import { describe, it, expect } from 'vitest';
import { FloorFinishNode } from './floorfinish.node';
import { createTestContext } from './../../test-utils';

describe('FloorFinishNode', () => {
  it('should create FloorFinish', async () => {
    const context = createTestContext();
    const inputs = {
      floorArea: null
    };
    const params = {
      material: "tile",
      pattern: "straight"
    };

    const result = await FloorFinishNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.finishedFloor).toBeDefined();
    expect(result.pattern).toBeDefined();
  });

  
});